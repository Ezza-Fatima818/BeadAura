const express = require("express");
const router = express.Router();

const Report = require("../models/Report");

/* =================================
   GET ALL REPORTS
================================= */
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("userId")
      .populate("orderId");

    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =================================
   CREATE REPORT
================================= */
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      orderId,
      category,
      message,
    } = req.body;

    // 🔥 VALIDATION
    if (!category || !message) {
      return res.status(400).json({
        error: "Category and message are required",
      });
    }

    const report = new Report({
      userId,
      orderId,
      category,
      message,
    });

    await report.save();

    res.status(201).json(report);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* =================================
   UPDATE REPORT STATUS
================================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;