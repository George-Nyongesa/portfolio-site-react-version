const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const { protect } = require("../middleware/auth");

// GET all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

// CRUD same pattern as Projects (POST, PUT, DELETE)
router.post("/", protect, async (req, res) => {
  try {
    const exp = new Experience(req.body);
    await exp.save();
    res.status(201).json(exp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json(exp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete experience" });
  }
});

module.exports = router;
