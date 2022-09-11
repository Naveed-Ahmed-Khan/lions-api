const express = require("express");

const {
  getSubjects,
  getSingleSubject,
  addSubject,
  deleteSubject,
  updateSubject,
} = require("../controllers/subjects.controllers");

const router = express.Router();

router.post("/add-subject", addSubject);
router.get("/get-subjects", getSubjects);
router.get("/get-subject/:id", getSingleSubject);
router.patch("/update-subject/:id", updateSubject);
router.delete("/delete-subject/:id", deleteSubject);

module.exports = router;
