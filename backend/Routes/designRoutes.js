const express = require("express");
const router = express.Router();

let savedDesigns = [];

// Save design image
router.post("/save-design", (req, res) => {
  const { image } = req.body;

  const newDesign = {
    id: Date.now(),
    image,
  };

  savedDesigns.push(newDesign);
   console.log("Saved designs:", savedDesigns); 

  res.json({
    message: "Design saved successfully",
    design: newDesign,
  });
});

// Get saved designs
router.get("/saved-designs", (req, res) => {
  res.json(savedDesigns);
});

module.exports = router;