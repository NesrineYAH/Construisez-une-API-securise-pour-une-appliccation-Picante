/*
const http = require("http");
const express = require("express");
const app = express();

//const app = require("./app");

const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");
const path = require("path");
const mongoose = require("./mongoDB/DB");
const cors = require("cors");
const bodyParser = require("body-parser"); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.options("*", cors());

app.use("/api/auth", userRoute);
app.use("/api", sauceRoute);
// pour indiquer à Express qu'il faut gérer la ressource images de manière statique
app.use("/images", express.static(__dirname + "/images"));

app.listen(3000, () => {
  console.log("Serveur a demarré sur le port 3000");
});
*/

const http = require("http");
const express = require("express");
const app = express();

//const app = require("./app");

const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");
const path = require("path");
const mongoose = require("./mongoDB/DB");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.options("*", cors());

app.use("/api/auth", userRoute);
app.use("/api", sauceRoute);
// pour indiquer à Express qu'il faut gérer la ressource images de manière statique
app.use("/images", express.static(__dirname + "/images"));

app.listen(3000, () => {
  console.log("Serveur a demarré sur le port 3000");
});
