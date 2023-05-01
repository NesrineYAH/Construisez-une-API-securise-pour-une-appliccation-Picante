// Importation du fichier sauce de models
const Sauce = require("../models/sauces");

//importation du fs de node.js :
const fs = require("fs");

//logique POST

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;

  const sauce = new Sauce({
    userId: req.auth.userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    mainPepper: sauceObject.mainPepper,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.upsateSAUCE = (req, res, next) => {
  //si on modifie le fichier image, récupérer le nom du fichier image sauce actuelle pour la suppréssion,
  //pour éviter d'avoir un fichier inutile dans le dossier images :
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (req.auth.userId !== sauce.userId) {
      res.status(403).json({ message: `Non autorisé !` });
    } else {
      let sauceObject;
      if (req.file) {
        sauceObject = JSON.parse(req.body.sauce);
        const filename = sauce.imageUrl.split("/").at(-1);
        try {
          fs.unlinkSync(`images/${filename}`);
        } catch (err) {
          console.log("cannnot delete image : " + filename);
        }

        sauce.imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } else {
        sauceObject = req.body;
      }

      sauce.mainPepper = sauceObject.mainPepper;
      sauce.manufacturer = sauceObject.manufacturer;
      sauce.name = sauceObject.name;
      sauce.descrption = sauceObject.descrption;

      sauce
        .updateOne(sauce)
        .then(() => res.status(201).json({ message: "Sauce modifée !" }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

exports.readSauces = async (req, res) => {
  try {
    const sauces = await Sauce.find({});
    res.status(200).send(sauces);
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.readSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findById(req.params.id);
    res.status(200).send(sauce);
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.deleteSauce = async (req, res) => {
  try {
    await Sauce.findByIdAndDelete(req.params.id);
    //staus ok sans message
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.likeSauce = async (req, res) => {
  try {
    const like = req.body.like;

    const sauce = await Sauce.findById(req.params.id);
    const element = sauce.usersDisliked.indexOf(req.auth.userId);
    const index = sauce.usersLiked.indexOf(req.auth.userId); // récupération de position userId  dans le tableau userliked (si -1, pas dans tableau)
    if (like === 1 && index === -1) {
      sauce.usersLiked.push(req.auth.userId);
      sauce.likes++;

      /*if (index != -1) {
        // si userId est dans tableau userliked, on supprime son userId dans le tableau
        sauce.usersLiked.splice(index, 1); // pour sipprimer le userID dans le tableau des userliked (supprime le like)
      } else {
        sauce.usersLiked.push(req.auth.userId); // si le like n'existe pas on ajoutera le like dans le tableau userliked
      }*/
    } else if (like === 0) {
      sauce.usersLiked = sauce.usersLiked.filter(
        (userId) => userId != req.auth.userId
      );
      sauce.usersDisliked = sauce.usersDisliked.filter(
        (userId) => userId != req.auth.userId
      );

      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;
      /*const indexDislike = sauce.usersDisliked.indexOf(req.auth.userId); // récupération de position userId  dans le tableau userDiliked (si -1, pas dans tableau)
      if (indexDislike != -1) {
        sauce.usersDisliked.slice(indexDislike, 1); // // pour sipprimer le userID dans le tableau des usersDisliked (doucmenttion slice )
        sauce.disliked = sauce.usersDisliked.length; // le nombre des userId qui ont dislicker sur cette sauce
      }*/
    } else if (like === -1 && element === -1) {
      sauce.usersDisliked.push(req.auth.userId);
      sauce.dislikes++;
    }

    sauce
      .updateOne(sauce)
      .then(() => res.status(201).json({ message: "Sauce modifée !" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
};

exports.dislikesSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findById(req.params.id);
    const index = sauce.usersDisliked.indexOf(req.auth.userId);
    if (index != -1) {
      sauce.usersDisliked.slice(indexDislike, 1); // supprimer le disliked
    } else {
      sauce.usersDisliked.push(req.auth.userId);
    }
    sauce.likes = sauce.usersLiked.length;

    sauce
      .updateOne(sauce)
      .then(() => res.satus(201))
      .json({ message: "sauce modifiée !" })
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    res.status(500).sendd("error");
  }
};
