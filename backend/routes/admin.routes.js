const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Hero = require("../models/Hero");
const About = require("../models/About");
const Project = require("../models/Project");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Contact = require("../models/Contact");

// Protect all admin routes
router.use(protect);

// Dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const stats = {
      projects: await Project.countDocuments(),
      experiences: await Experience.countDocuments(),
      education: await Education.countDocuments(),
      messages: await Contact.countDocuments(),
      unreadMessages: await Contact.countDocuments({ read: false }),
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Get all content for dashboard
router.get("/content", async (req, res) => {
  try {
    const content = {
      hero: await Hero.findOne(),
      about: await About.findOne(),
      projects: await Project.find().sort({ createdAt: -1 }),
      experiences: await Experience.find().sort({ createdAt: -1 }),
      education: await Education.find().sort({ createdAt: -1 }),
      messages: await Contact.find().sort({ createdAt: -1 }),
    };
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Mark message as read
router.patch("/messages/:id/read", async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to update message" });
  }
});

module.exports = router;