/*
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("./mongoDB/DB");
const cors = require("cors");
const bodyParser = require("body-parser"); 

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

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
app.use("/images", express.static(__dirname + "/images"));

module.exports = app;
*/

const express = require("express");
const app = express();
const userRoute = require("./routes/user"); //app 11/06
const sauceRoute = require("./routes/sauce"); //app 11/06
const path = require("path"); //app 11/06
const cors = require("cors"); //app 11/06
const bodyParser = require("body-parser");
const mongoose = require("./mongoDB/DB");
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS :
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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", userRoute);
app.use("/api/sauce", sauceRoute);
app.use("/images", express.static(__dirname + "/images"));

module.exports = app;
