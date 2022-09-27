const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getNotifications,
  getSingleNotification,
  addNotification,
  deleteNotification,
  updateNotification,
  getTutorNotifications,
  readAllNotification,
} = require("../controllers/notifications.controllers");

const router = express.Router();

router.post("/add-notification", addNotification);
router.get("/get-cities", getNotifications);
router.get("/get-notification/:id", getSingleNotification);
router.get("/read-allnotifications/:id", readAllNotification);
router.get("/get-tutor-notifications/:id", getTutorNotifications);
router.patch("/update-notification/:id", protect, updateNotification);
router.delete("/delete-notification/:id", protect, deleteNotification);

module.exports = router;
