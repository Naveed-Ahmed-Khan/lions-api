const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
});

const Achievement = new mongoose.model("Achievement", AchievementSchema);

module.exports = Achievement;
