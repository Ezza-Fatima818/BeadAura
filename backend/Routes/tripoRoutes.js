const express = require("express");

const router = express.Router();

router.post(
  "/generate-3d",

  async (req, res) => {

    try {

      const { imageUrl } = req.body;

      const response = await fetch(
        "https://api.tripo3d.ai/v2/openapi/task",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              "Bearer tsk_FF12PDH7N7a5b890m_2u6x_cm9hwLF-9t310gT4Xc-Z",
          },

          body: JSON.stringify({
            type: "image_to_model",

            file: {
              type: "image",
              url: imageUrl,
            },
          }),
        }
      );

      const data = await response.json();

      res.json(data);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

router.get(
  "/check-3d/:taskId",

  async (req, res) => {

    try {

      const taskId = req.params.taskId;

      const response = await fetch(
        `https://api.tripo3d.ai/v2/openapi/task/${taskId}`,

        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              "Bearer tsk_FF12PDH7N7a5b890m_2u6x_cm9hwLF-9t310gT4Xc-Z",
          },
        }
      );

      const data = await response.json();

      res.json(data);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);



// 👇 ADD THIS ROUTE
router.get(
  "/proxy-model",

  async (req, res) => {

    try {

      const modelUrl = req.query.url;

      const response = await fetch(modelUrl);

      const buffer =
        await response.arrayBuffer();

      res.set(
        "Content-Type",
        "model/gltf-binary"
      );

      res.send(
        Buffer.from(buffer)
      );

    } catch (error) {

      console.log(error);

      res.status(500).send(
        "Failed to load model"
      );
    }
  }
);


module.exports = router;