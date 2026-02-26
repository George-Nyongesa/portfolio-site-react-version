const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { protect } = require("../middleware/auth");

// GET all contact messages (protected - admin only)
router.get("/", protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST new contact message (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    
    // Optional: Send email notification here
    
    res.status(201).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE message (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

module.exports = router;