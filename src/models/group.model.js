const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const GroupSchema = new mongoose.Schema({
  groupName: { type: String /*, required: true */ },
  // groupAdmin_id: { type: Id, ref: "User" /*, required: true */ },
  totalMembers: { type: Number },
  groupMembers: [{ type: Id, ref: "User" }],
});

const Group = new mongoose.model("Group", GroupSchema);

module.exports = Group;
