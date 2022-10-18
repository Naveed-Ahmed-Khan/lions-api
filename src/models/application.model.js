const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const ApplicationSchema = new mongoose.Schema({
  job_id: { type: Id, ref: "Job", required: true },
  applicant_id: { type: Id, ref: "Tutor", required: true },
  coverLetter: { type: String, required: true },
  quialification: { type: String, required: false },
  expectedBudget: { type: String, required: false },
  distance: { type: String, required: false },
  isShortlisted: { type: Boolean, default: false },
  isSelected: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false },
  feedback: {
    user_id: { type: Id, ref: "Student" },
    rating: { type: Number, default: 1 },
    comment: { type: String, required: false },
  },
});

const Application = new mongoose.model("Application", ApplicationSchema);

module.exports = Application;
