const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://nesrineyahoum:Aban0U0EqEa04KRm@cluster0.aumt3cr.mongodb.net/?retryWrites=true&w=majority",
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
