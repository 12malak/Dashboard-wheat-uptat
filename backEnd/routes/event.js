const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/event");



router.post("/adminEvent", adminControler.addEvent);
router.get('/getAllEvents',adminControler.getAllEvents); 
router.get("/getEvents/:id", adminControler.getEvents);
router.delete("/deleteEvent/:id", adminControler.deleteEvent);
router.put("/updateEvent/:id",adminControler.updateEvent);
module.exports = router;