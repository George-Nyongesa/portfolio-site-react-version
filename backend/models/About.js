const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  paragraphs: [{ type: String }],
  loves: [{ type: String }],
  skills: [
    {
      category: String,
      items: [{ type: String }],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);
