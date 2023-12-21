import express from "express";
import cookieParser from "cookie-parser";
import { urlencoded, json } from "body-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import { config } from "dotenv";
// const mercadopago = require("mercadopago");

import "./db.js";

const server = express();

config();

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

// //mercadopago
// mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });
// server.post("/payment", (req, res) => {
//   const prod = req.body;
//   let preference = {
//     items: [
//       {
//         id: prod.id,
//         title: prod.name,
//         currency_id: "ARS",
//         picture_url: prod.image,
//         description: prod.event,
//         category_id: "art",
//         quantity: 1,
//         unit_price: prod.price,
//       },
//     ],
//     back_urls: {
//       failure: "/http://localhost:3000/reservations",
//       pending: "/pending",
//       success: "http://localhost:3000/reservations",
//     },
//     auto_return: "approved",
//     binary_mode: true,
//   };
//   mercadopago.preferences
//     .create(preference)
//     .then((response) => res.status(200).send({ response }));
// });

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
