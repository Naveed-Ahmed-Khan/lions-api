const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },

  name: { type: String, required: true },
  mobile: { type: Number, required: false },
  watsapp: { type: Number, required: false },
  city: { type: String, required: true },
  area: { type: String, required: false },
  address: { type: String, required: true },
  profilePic: { type: String, required: false },

  userStatus: { type: String, required: false },
  tag: { type: String, required: false },
  isBlacklisted: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
});

const Student = new mongoose.model("Student", StudentSchema);

module.exports = Student;
