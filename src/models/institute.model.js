const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  email: { type: String, required: true },

  name: { type: String, required: true },
  // mobile: { type: Number, required: false },
  owner: { type: String, required: true },
  cnic: { type: Number, required: true },
  watsapp: { type: Number, required: false },
  city: { type: String, required: false },
  area: { type: String, required: false },
  address: { type: String, required: true },
  profilePic: { type: String, required: false },
  cnicPic: { type: String, required: false },
  facebook: { type: String, required: false },
  website: { type: String, required: false },

  userType: { type: String, required: false },
  userStatus: { type: String, required: false },
  tag: { type: String, required: false },
  isBlacklisted: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
});

const Institute = new mongoose.model("Institute", InstituteSchema);

module.exports = Institute;
