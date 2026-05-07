const mongoose = require("mongoose");

const jewelryComponentSchema = new mongoose.Schema({
  name: String,
  image: String,
  material: String, // gold / silver
  price: Number,
  category: String
});

module.exports = mongoose.model("JewelryComponent", jewelryComponentSchema);
await jewelryComponentSchema.save();