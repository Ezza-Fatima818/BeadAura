const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  // 🔥 ADD ROLE FIELD
  role: {
    type: String,
    enum: ["customer", "admin", "seller"],
    default: "customer",   // ✅ important
  },
});

module.exports = mongoose.model("User", userSchema);