const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  // 🔥 USER
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🔥 ORDER
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },

  // 🔥 REPORT CATEGORY
  category: {
    type: String,
    required: true,
  },

  // 🔥 COMPLAINT MESSAGE
  message: {
    type: String,
    required: true,
  },

  // 🔥 STATUS
  status: {
    type: String,
    enum: ["Pending", "In Review", "Resolved", "Rejected"],
    default: "Pending",
  },

  // 🔥 DATE
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);