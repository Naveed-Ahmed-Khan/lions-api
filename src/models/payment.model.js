const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const PaymentSchema = new mongoose.Schema({
  // tutor_id: { type: Id, ref: "Tutor", required: true },
  app_id: { type: Id, ref: "Application", required: true },
  earned: { type: String, default: null },
  percentage: { type: Number, default: 25 },
  charges: { type: Number, default: null },
  isPaid: { type: Boolean, default: false },
  isFinalized: { type: Boolean, default: false },
});

const Payment = new mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
