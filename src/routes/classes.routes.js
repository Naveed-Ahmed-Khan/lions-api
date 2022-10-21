const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getClasses,
  getSingleClass,
  addClass,
  deleteClass,
  updateClass,
  getStudentClasses,
  getTutorClasses,
} = require("../controllers/classes.controllers");

const router = express.Router();

router.post("/add-class", addClass);
router.get("/get-classes", getClasses);
router.get("/get-student-classes", getStudentClasses);
router.get("/get-tutor-classes", getTutorClasses);
router.get("/get-class/:id", getSingleClass);
router.patch("/update-class/:id", protect, updateClass);
router.delete("/delete-class/:id", protect, deleteClass);

module.exports = router;
