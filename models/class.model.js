const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Class = new mongoose.model("Class", ClassSchema);

module.exports = Class;
