const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Hero", HeroSchema);
