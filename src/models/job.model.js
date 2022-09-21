const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const JobSchema = new mongoose.Schema({
  user_id: { type: Id, ref: "Student", default: null },
  admin_id: { type: Id, ref: "Admin", default: null },
  title: { type: String, required: true },
  subjects: { type: Array, required: true },
  class: { type: Array, required: true },
  institute: { type: String, required: true },
  duration: { type: String, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: false },
  experience: { type: Number, required: true },
  teachingMode: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: true },
  // location: {
  //   city: { type: String, required: true },
  //   place: { type: String, required: true },
  // },
  // jobStatus: { type: String, required: true },
  // selectedApp_id: { type: Id, ref: "Application", default: null },
  // shortlistedApps: [{ type: Id, ref: "Application", required: false }],
});

const Job = new mongoose.model("Job", JobSchema);

module.exports = Job;
