const express = require("express");
const router = express.Router();

const {
  getBeads,
  addBead
} = require("../controllers/beadController");

router.get("/", getBeads);
router.post("/", addBead);

module.exports = router;