const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // 🔥 CUSTOMER
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🔥 PRODUCTS
  products: [
    {
      // PRODUCT ID
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      // SELLER ID
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      // QUANTITY
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  // 🔥 TOTAL
  totalAmount: {
    type: Number,
    required: true,
  },

  // 🔥 SHIPPING ADDRESS
  address: {
    type: Object,
  },

  // 🔥 PAYMENT
  paymentMethod: {
    type: String,
  },

  paymentStatus: {
    type: String,
    default: "Pending",
  },

  // 🔥 ORDER STATUS
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  // 🔥 CREATED DATE
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);