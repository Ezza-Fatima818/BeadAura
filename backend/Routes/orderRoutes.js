const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// ✅ GET ALL ORDERS (FOR ADMIN)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // 🔥 get user info
      .populate("products.productId", "name price"); // 🔥 get product info

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ CREATE ORDER (FROM CUSTOMER)
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE ORDER STATUS (ADMIN CONTROL)
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }, // e.g. Pending → Delivered
      { new: true }
    );

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE ORDER (OPTIONAL)
// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;