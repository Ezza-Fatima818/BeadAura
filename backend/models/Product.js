const mongoose = require("mongoose"); // ✅ ADD THIS

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Product", productSchema);