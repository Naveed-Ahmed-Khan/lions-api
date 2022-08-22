const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const ApplicationSchema = new mongoose.Schema({
  job_id: { type: Id, ref: "Job", required: true },
  applicant_id: { type: Id, ref: "User", required: true },
  coverLetter: { type: String, required: true },
  quialification: { type: String, required: true },
  expectedBudget: { type: String, required: true },
  isSelected: { type: Boolean, default: false },
});

const Application = new mongoose.model("Application", ApplicationSchema);

module.exports = Application;
