const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  material: String,
  ageGroup: String,
  color: String,
  occasion: String,
  description: String,

  imageUrl: String,

  // NEW
  publicId: String,

  // NEW
  designType: {
    type: String,
    default: "custom",
  },

  // NEW
  designData: {
    type: Object,
    default: {},
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Design",
  designSchema,
  "mydesigns"
);