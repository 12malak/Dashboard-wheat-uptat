const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const drugRoutes = require('./routes/drug');
const foodRoutes = require('./routes/food');
const eventRoutes = require('./routes/event');
const contactRoutes = require('./routes/contact');
const confirmation = require('./routes/confirmation');
const payment = require('./routes/Payment');
const path = require('path');


app.use(bodyParser.json({ limit: '10mb' }));


// ----------- Public Images -----------//


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Midlwares
app.use(drugRoutes)
app.use(foodRoutes)
app.use(eventRoutes)
app.use(contactRoutes)
app.use(confirmation)
app.use(payment)


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statuscode || 500;
  const message =
    error.message || "some thing wrong! Error in the server please try again ";
  const data = error.data;
  res.status(status).json({ message: message, data: data, status: status });
});

//connecting to database
const MONGODB_URI = "mongodb+srv://malak:1234@malak.gm03llj.mongodb.net/test";


//listen
app.use(cors());
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database Connected!"))
  .then((result) => {
    app.listen(8000, () => {
      console.log("The server is listing on ", 8000, "now");
    });
  })
  .catch((err) => {
    console.log(err);
  });
