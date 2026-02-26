const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: String, required: true },
  bullets: [{ type: String }],
  tech: [{ type: String }],
  icon: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
