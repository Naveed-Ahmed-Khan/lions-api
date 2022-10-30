const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const JobSchema = new mongoose.Schema({
  user_id: { type: Id, required: true, refPath: "userModel" },
  userModel: {
    type: String,
    required: true,
    enum: ["Student", "Admin"],
  },

  title: { type: String, required: true },
  subjects: { type: Array, required: true },
  class: { type: Array, required: true },
  institute: { type: String, required: true },
  duration: { type: String, required: true },
  watsapp: { type: Number, required: false },
  address: { type: String, required: false },

  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: false },
  experience: { type: String, required: true },
  teachingMode: { type: String, required: true },

  description: { type: String, required: true },
  budget: { type: Number, required: true },

  isFeatured: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: true },
});

const Job = new mongoose.model("Job", JobSchema);

module.exports = Job;
