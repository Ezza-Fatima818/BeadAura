const Bead = require("../models/Bead");

exports.getBeads = async (req, res) => {
  try {
    const beads = await Bead.find();
    res.json(beads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addBead = async (req, res) => {
  try {
    const bead = await Bead.create(req.body);
    res.status(201).json(bead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};