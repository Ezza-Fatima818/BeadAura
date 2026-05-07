const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // ✅ correct

// ✅ GET ALL PRODUCTS (WITH USER INFO)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("createdBy", "name email"); // optional if exists

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ REMOVE ADD PRODUCT ROUTE (ADMIN SHOULD NOT ADD)

// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;