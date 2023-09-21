const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/drug");



router.post("/adminDrug", adminControler.addDrug);
router.get('/getAllDrugs',adminControler.getAllDrugs)
router.delete("/deleteDrug/:id", adminControler.deleteDrug);
router.get("/getDrug/:id", adminControler.getDrug);
router.put("/updateDrug/:id",adminControler.updateDrug);
module.exports = router;