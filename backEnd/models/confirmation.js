
const { mongoose } = require('mongoose');

const Schema = mongoose.Schema;

//console.log(User);
// Get the Schema constructor


const confirmation = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  foodName: {
    type: String,
    required: true
  },
  foodDesc: {
    type: String,
    required: true
  },
  foodUrl: {
    type: String,
   
  },

  Acceptance: {
    type: Boolean,
    required: false
  }
});

// Create model from the schema
module.exports = mongoose.model("Confirmation", confirmation);
