const express = require("express");
const router = express.Router();
const Education = require("../models/Education");
const { protect } = require("../middleware/auth");

// GET all education
router.get("/", async (req, res) => {
  try {
    const edu = await Education.find();
    res.json(edu);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch education" });
  }
});

// CRUD same pattern
router.post("/", protect, async (req, res) => {
  try {
    const edu = new Education(req.body);
    await edu.save();
    res.status(201).json(edu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!edu) return res.status(404).json({ error: "Education not found" });
    res.json(edu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) return res.status(404).json({ error: "Education not found" });
    res.json({ message: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete education" });
  }
});

module.exports = router;
