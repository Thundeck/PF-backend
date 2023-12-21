const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.DB_URL || 3001;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", function () {
  console.log("Connected to MongoDB Atlas!");
});

mongoose.connection.on("error", function (err) {
  console.log("Error connecting to MongoDB Atlas: ", err);
});
