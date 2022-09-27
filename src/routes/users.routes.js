const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getUsers,
  getSingleUser,
  deleteUser,
  getStudents,
  updateTutorProfile,
  blacklistTutor,
  verifyTutor,
  getSingleTutor,
  featureTutor,
  getCompleteTutors,
  getTutors,
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/get-tutors", getTutors);
router.get("/get-complete-tutors", getCompleteTutors);
router.get("/get-students", getStudents);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.get("/get-tutor/:id", getSingleTutor);
router.patch("/update-tutor/:id", protect, updateTutorProfile);
router.get("/verify-tutor/:id", verifyTutor);
router.get("/feature-tutor/:id", featureTutor);
router.get("/blacklist-tutor/:id", blacklistTutor);
router.delete("/delete-user/:id", protect, deleteUser);

module.exports = router;
