const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  drugName: {
    type: String,
    required: true
  },
  drugDesc: {
    type: String,
    required: true
  },
  drugUrl: {
    type: String,
    required: true
  },
  // drugType: {
  //   type: String,
  //   required: true
  // }
});

// Create model from the schema
module.exports = mongoose.model("Drug", drugSchema);
