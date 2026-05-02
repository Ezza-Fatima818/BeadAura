const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  material: {
    type: String,
  },
  ageGroup: {
    type: String,
  },
  color: {
    type: String,
  },
  occasion: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Design", designSchema, "mydesigns"); // 👈 keep same collection