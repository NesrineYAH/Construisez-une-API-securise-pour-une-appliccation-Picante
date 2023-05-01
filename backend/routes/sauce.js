const express = require("express");
const router = express.Router();
const multerConfig = require("../Middleware/multer-config");
const auth = require("../Middleware/auth");

const sauceCtrl = require("../controllers/sauce");

router.get("/sauces", auth, sauceCtrl.readSauces);
router.post("/sauces", auth, multerConfig, sauceCtrl.createSauce);
router.get("/sauces/:id", auth, sauceCtrl.readSauce);
router.delete("/sauces/:id", auth, sauceCtrl.deleteSauce);
router.put("/sauces/:id", auth, multerConfig, sauceCtrl.upsateSAUCE);
router.post("/sauces/:id/like", auth, sauceCtrl.likeSauce);
router.post("/sauces/:id/Dislike", auth, sauceCtrl.dislikesSauce);

module.exports = router;
