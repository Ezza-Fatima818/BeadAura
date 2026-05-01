const mongoose = require("mongoose");

const beadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  color: {
    type: String
  },

  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Bead", beadSchema);