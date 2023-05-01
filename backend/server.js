const http = require("http");
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");
const path = require("path");
const mongoose = require("./mongoDB/DB");
const cors = require("cors");
const bodyParser = require("body-parser"); //TODO voir pour utiliser celui d'express

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//TODO connexion à la mongodb

const allowCors = {
  origin: "http://localhost:4200",
  optionSuccessStatus: 200,
};

app.use(cors(allowCors));

app.use("/api/auth", userRoute);
app.use("/api", sauceRoute);
app.use("/images", express.static(__dirname + "/images"));

app.listen(3000, () => {
  console.log("Serveur a demarré sur le port 3000");
});
