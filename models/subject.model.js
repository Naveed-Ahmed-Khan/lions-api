const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Subject = new mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
