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

  // cloudinary
  publicId: String,

  // type of design
  designType: {
    type: String,
    default: "custom",
  },

  // editable design data
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