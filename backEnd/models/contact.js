const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  patientName: {
    type: String,
    required: true
  },
  patientGmail: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  patientMsg: {
    type: String,
    required: true
  }
});

// Create model from the schema
module.exports = mongoose.model("Contact", contactSchema);
