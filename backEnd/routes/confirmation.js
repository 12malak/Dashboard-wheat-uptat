const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/confirmation");
const multer = require('multer');
const path = require('path');
// Multer Configurations
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public'));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage }).single('foodUrl');


router.put("/Recipes/:id",upload ,adminControler.updateRecipes);
router.post("/adminConfirmation",upload , adminControler.addConfirmation);
router.get("/getAllFalseConfirmations", adminControler.getAllFalseConfirmations);
router.get("/getAllTrueConfirmations", adminControler.getAllTrueConfirmations);
router.get("/getAllTrueConfirmationsCard/:id", adminControler.getAllTrueConfirmationsCard);
router.get("/getConfirmation/:id", adminControler.getConfirmation);
router.delete("/deleteConfirmation/:id", adminControler.deleteConfirmation);
router.post("/changeToTrue", adminControler.changeToTrue);

router.delete("/deleteRecipes/:id", adminControler.deleteRecipes);
module.exports = router;

