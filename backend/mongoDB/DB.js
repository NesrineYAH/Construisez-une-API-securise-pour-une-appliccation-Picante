const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const configUser = process.env.CONFIG_USER;
const configPassword = process.env.CONFIG_PASSWORD;

mongoose
  .connect(
    "mongodb+srv://" +
      configUser +
      ":" +
      configPassword +
      "@cluster0.aumt3cr.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => {
    console.log(e);
    console.log("connexion à MongoDB échouée !");
  });

module.exports = mongoose;
