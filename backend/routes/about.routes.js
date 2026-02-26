const express = require("express");
const router = express.Router();
const About = require("../models/About");
const { protect } = require("../middleware/auth");

// GET about
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch about" });
  }
});

// UPDATE about
router.put("/", protect, async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
