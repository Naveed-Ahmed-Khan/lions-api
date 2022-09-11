const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getUsers,
  getSingleUser,
  /* getUserByName, */
  addUser,
  deleteUser,
  getTutors,
  getStudents,
  updateTutorProfile,
} = require("../controllers/users.controllers");

const router = express.Router();

router.post("/add-user", protect, addUser);
router.get("/get-tutors", getTutors);
router.get("/get-students", getStudents);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
/* router.get("/get-userbyname/:id", getUserByName); */
router.patch("/update-tutor/:id", protect, updateTutorProfile);
router.delete("/delete-user/:id", protect, deleteUser);

module.exports = router;
