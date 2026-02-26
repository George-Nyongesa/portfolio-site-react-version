const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String },
  bullets: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Education", EducationSchema);
