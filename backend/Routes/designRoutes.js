const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const Design = require("../models/Design");

// ✅ Save design
router.post("/save-design", async (req, res) => {
  try {
     console.log("Incoming body:", req.body);
    const {
      image,
      userId,
      material = "Custom",
      ageGroup = "18",
      color = "Custom",
      occasion = "None",
      description = "Canvas Design",
      status = "Pending"
    } = req.body;

    // 🚨 Check userId
    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    // 🔥 Detect image type (jpg/png/etc)
    const matches = image.match(/^data:image\/(\w+);base64,/);
    const extension = matches ? matches[1] : "jpg";

    // 🔥 Remove base64 prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // 🔥 Ensure uploads folder exists
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    // 🔥 Create file
    const fileName = `${Date.now()}.${extension}`;
    const fullPath = path.join(uploadPath, fileName);

    // 🔥 Save file
    fs.writeFileSync(fullPath, base64Data, "base64");

    // 🔥 Save in MongoDB
    const newDesign = new Design({
      userId,
      material,
      ageGroup,
      color,
      occasion,
      description,
      status,
      imageUrl: "/uploads/" + fileName, // ✅ FIXED
    });

    try {
  await newDesign.save();
  console.log("Saved to MongoDB:", newDesign);
} catch (dbError) {
  console.error("MongoDB save error:", dbError);
}

    res.json({
      message: "Design saved successfully",
      design: newDesign,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get designs (USER SPECIFIC)
router.get("/saved-designs/:userId", async (req, res) => {
  try {
   
    const designs = await Design.find({
      userId: req.params.userId,
    });

    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;