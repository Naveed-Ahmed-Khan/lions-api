const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  cnic: { type: Number, required: false },
  birth: { type: String, required: false },
  gender: { type: String, required: false },
  mobile: { type: Number, required: false },
  watsapp: { type: Number, required: false },
  city: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: false },
  degreeInstitute: { type: String, required: false },
  passingYear: { type: Number, required: false },
  jobTitle: { type: String, required: false },
  jobInstitute: { type: String, required: false },
  experience: { type: Number, required: false },
  profilePic: { type: String, required: false },
  subjects: { type: Array, required: false },
  classes: { type: Array, required: false },
  teachingMode: { type: String, required: false },
  aboutMe: { type: String, required: false },
  achievements: { type: String, required: false },
  userType: { type: String, required: false },
  userStatus: { type: String, required: false },
  tag: { type: String, required: false },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
