const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventDesc: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create model from the schema
module.exports = mongoose.model("Event", eventSchema);
