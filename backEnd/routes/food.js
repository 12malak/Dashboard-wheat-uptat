const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/food");



router.post("/adminFood", adminControler.addFood);
router.get('/getAllFoods',adminControler.getAllFoods);
router.get("/getFood/:id", adminControler.getFood);
router.delete("/deleteFood/:id", adminControler.deleteFood);
router.put("/updateFood/:id",adminControler.updateFood);
module.exports = router;