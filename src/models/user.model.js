const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },

  tutor: { type: Id, ref: "Tutor", default: null },
  student: { type: Id, ref: "Student", default: null },
  admin: { type: Id, ref: "Admin", default: null },
  institute: { type: Id, ref: "Institute", default: null },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
