const Notification = require("../models/notification.model");

//////////////////////////////////////////////////////////////////////////////
async function addNotification(req, res) {
  try {
    const data = Notification.create(req.body);
    res.status(201).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getNotifications(req, res) {
  try {
    const data = await Notification.find();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getTutorNotifications(req, res) {
  const tutorId = req.params.id;
  try {
    const data = await Notification.find({ tutor_id: tutorId });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleNotification(req, res) {
  const notificationId = req.params.id;
  try {
    const data = await Notification.findById(notificationId);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function readAllNotification(req, res) {
  const tutorId = req.params.id;
  try {
    await Notification.updateMany(
      { tutor_id: tutorId },
      { $set: { isRead: true } }
    );
    res.status(200).json({ msg: "All notifications Read" });
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}
//////////////////////////////////////////////////////////////////////////////
async function updateNotification(req, res) {
  const notificationId = req.params.id;
  try {
    const data = await Notification.updateMany()(notificationId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteNotification(req, res) {
  const notificationId = req.params.id;
  try {
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ msg: "Notification Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addNotification,
  getNotifications,
  getSingleNotification,
  readAllNotification,
  getTutorNotifications,
  updateNotification,
  deleteNotification,
};
