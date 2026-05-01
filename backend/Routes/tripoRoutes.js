const express = require("express");
const router = express.Router();

router.post("/generate-3d", async (req, res) => {
  try {
    console.log("Loading bracelet 3D model...");

    const fakeResponse = {
      model_url: "http://localhost:3000/models/bracelet.glb"
    };

    return res.json(fakeResponse);

  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;