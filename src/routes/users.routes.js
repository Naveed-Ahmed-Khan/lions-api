const express = require("express");

const {
  getUsers,
  getSingleUser,
  addUser,
  deleteUser,
  getTutors,
  getStudents,
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/get-tutors", getTutors);
router.get("/get-studets", getStudents);
router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.post("/add-user", addUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
