const express = require("express");

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

router.post("/add-user", addUser);
router.get("/get-tutors", getTutors);
router.get("/get-studets", getStudents);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
/* router.get("/get-userbyname/:id", getUserByName); */
router.patch("/update-tutor/:id", updateTutorProfile);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
