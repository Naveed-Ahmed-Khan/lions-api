const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const NotificationSchema = new mongoose.Schema({
  tutor_id: { type: Id, ref: "Tutor", default: null },
  student_id: { type: Id, ref: "Student", default: null },
  job_id: { type: Id, ref: "Job", default: null },
  type: { type: String, required: true },
  title: { type: String, required: true },
  msg: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

const Notification = new mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
