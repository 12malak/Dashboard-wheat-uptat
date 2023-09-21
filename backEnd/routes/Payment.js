const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/Payment");



router.post("/adminPayment", adminControler.addPayment);
router.get("/getAllPayment", adminControler.getAllPayment);

router.delete("/deleteOrders/:id", adminControler.deleteOrders);
module.exports = router;