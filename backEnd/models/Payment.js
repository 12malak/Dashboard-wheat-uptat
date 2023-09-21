const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  UserName: {
    type: String,
    required: true
  },
  Governorate: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
 

 
});

// Create model from the schema
module.exports = mongoose.model("Payment", PaymentSchema);
