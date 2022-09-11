const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getSubjects,
  getSingleSubject,
  addSubject,
  deleteSubject,
  updateSubject,
} = require("../controllers/subjects.controllers");

const router = express.Router();

router.post("/add-subject", protect, addSubject);
router.get("/get-subjects", getSubjects);
router.get("/get-subject/:id", getSingleSubject);
router.patch("/update-subject/:id", protect, updateSubject);
router.delete("/delete-subject/:id", protect, deleteSubject);

module.exports = router;
