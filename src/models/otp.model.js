const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otpCode: { type: String, required: true },
  expiresIn: { type: Number, required: true },
});

const Otp = new mongoose.model("Otp", OtpSchema);

module.exports = Otp;
