const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const AccountSchema = new mongoose.Schema({
  tutor_id: { type: Id, ref: "Tutor", required: true },
  jobs: [
    {
      job_id: { type: Id, ref: "Job", required: true },
      earned: { type: String, required: true },
      fee: { type: String, required: true },
      isPaid: { type: Boolean, default: false },
    },
  ],
});

const Account = new mongoose.model("Account", AccountSchema);

module.exports = Account;
