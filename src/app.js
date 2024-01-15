const express = require("express");
const cookieParser = require("cookie-parser");
const { urlencoded, json } = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { config } = require("dotenv");
const { MercadoPagoConfig, Preference } = require("mercadopago");
config();

const db = require("./db.js");

const server = express();

server.name = "API";

server.use(urlencoded({ extended: true, limit: "50mb" }));
server.use(json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

const preference = new Preference(client);

server.post("/payment", (req, res) => {
  const { name, image, price } = req.body;
  preference
    .create({
      body: {
        items: [
          {
            title: name.toString(),
            currency_id: "ARS",
            picture_url: image.toString(),
            quantity: 1,
            unit_price: Number(price),
          },
        ],
        back_urls: {
          failure: "http://localhost:3000/reservations",
          pending: "",
          success: "http://localhost:3000/reservations",
        },
        auto_return: "approved",
        binary_mode: true,
      },
    })
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      res.status(error.status).json({ message: error.message });
    });
});

server.use("/", routes);

server.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
