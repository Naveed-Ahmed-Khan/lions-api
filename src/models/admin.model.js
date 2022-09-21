const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
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

const Admin = new mongoose.model("Admin", AdminSchema);

module.exports = Admin;
