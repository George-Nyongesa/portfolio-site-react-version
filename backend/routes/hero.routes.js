const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero");
const { protect } = require("../middleware/auth");

// GET hero
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hero" });
  }
});

// UPDATE hero
router.put("/", protect, async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(hero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
