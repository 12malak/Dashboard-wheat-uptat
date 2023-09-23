const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/contact");


router.delete("/deleteContact/:id", adminControler.deleteContact);
router.post("/adminContact", adminControler.addContact);
router.get("/getAllContacts", adminControler.getAllContacts);
router.get("/ViewContact/:id", adminControler.ViewContact);
module.exports = router;