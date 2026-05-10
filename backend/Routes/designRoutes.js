const express = require("express");
const router = express.Router();

const Design = require("../models/Design");

// ✅ IMPORTANT
const upload = require("../middleware/upload");

/* =========================
   SAVE DESIGN
========================= */

router.post(
  "/save-design",
  upload.single("designImage"),

  async (req, res) => {

    try {

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      // ✅ check image upload
      if (!req.file) {
        return res.status(400).json({
          error: "Image upload failed",
        });
      }

      const {
        userId,
        material = "Custom",
        ageGroup = "18",
        color = "Custom",
        occasion = "None",
        description = "Canvas Design",
      } = req.body;

      // ✅ user required
      if (!userId) {
        return res.status(400).json({
          error: "UserId is required",
        });
      }

      // ✅ save design
      const newDesign = new Design({
        userId,
        material,
        ageGroup,
        color,
        occasion,
        description,

        // cloudinary
        imageUrl: req.file.path,
        publicId: req.file.filename,

        // auto pending
        status: "Pending",
      });

      await newDesign.save();

      res.json({
        success: true,
        message: "Design saved successfully",
        design: newDesign,
      });

    } catch (err) {

      console.error("SAVE DESIGN ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

/* =========================
   GET USER SAVED DESIGNS
========================= */

router.get(
  "/saved-designs/:userId",

  async (req, res) => {

    try {

      const designs =
        await Design.find({
          userId: req.params.userId,
        });

      res.json(designs);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

module.exports = router;