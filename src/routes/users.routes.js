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
  getInstitutes,
  getSingleInstitute,
  verifyInstitute,
  getTutorsWithoutPics,
  getFeaturedTutors,
  getTutorsWithoutProfile,
  getTutorsWithPics,
  getTutorsWithoutProfilePicOnly,
  deleteTutor,
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/get-tutors", getTutors);
router.get("/get-tutorswithout-pics", getTutorsWithoutPics);
router.get("/get-tutorswithout-profilePics", getTutorsWithoutProfilePicOnly);
router.get("/get-tutors-pics", getTutorsWithPics);
router.get("/get-featured-tutors", getFeaturedTutors);
router.get("/get-institutes", getInstitutes);
router.get("/get-complete-tutors", getCompleteTutors);
router.get("/get-students", getStudents);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.get("/get-institute/:id", getSingleInstitute);
router.get("/get-tutor/:id", getSingleTutor);
router.patch("/update-tutor/:id", protect, updateTutorProfile);
router.patch("/update-institute/:id", protect, updateTutorProfile);
router.get("/verify-tutor/:id", verifyTutor);
router.get("/verify-institute/:id", verifyInstitute);
router.get("/feature-tutor/:id", featureTutor);
router.get("/blacklist-tutor/:id", blacklistTutor);
router.delete("/delete-user/:id", protect, deleteUser);
router.delete("/delete-tutor/:id", deleteTutor);

module.exports = router;
