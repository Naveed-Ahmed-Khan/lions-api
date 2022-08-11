const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const JobSchema = new mongoose.Schema({
  user_id: { type: Id, ref: "User", required: false },
  subjects: { type: Array, required: true },
  class: { type: Array, required: true },
  institute: { type: String, required: true },
  duration: { type: String, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  experience: { type: Number, required: true },
  teachingMode: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: String, required: true },
  isFeatured: { type: Boolean, required: true },
});

const Job = new mongoose.model("Job", JobSchema);

module.exports = Job;
