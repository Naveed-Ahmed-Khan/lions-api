const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  address: { type: String, required: true },
  contact: { type: Number, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false },
  userType: { type: String, required: true },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
