const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  tech: [{ type: String }],
  demo: { type: String },
  code: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
