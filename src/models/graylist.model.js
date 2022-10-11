const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const GrayListSchema = new mongoose.Schema({
  tutor_id: { type: Id, ref: "Tutor", required: true },
  user_id: { type: Id, required: true, refPath: "userModel" },
  userModel: {
    type: String,
    required: true,
    enum: ["Institute", "Admin"],
  },
  reason: { type: String, required: true },
});

const GrayList = new mongoose.model("GrayList", GrayListSchema);

module.exports = GrayList;
