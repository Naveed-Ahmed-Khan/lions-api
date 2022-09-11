const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  addApplication,
  getApplications,
  getJobApplications,
  getMyApplications,
  getSingleApplication,
  updateApplicant,
  deleteApplication,
} = require("../controllers/applications.controllers");

const router = express.Router();

router.post("/add-application", protect, addApplication);
router.get("/get-applications", getApplications);
router.get("/get-myapplications/:id", getMyApplications);
router.get("/get-jobapplications/:id", getJobApplications);
router.get("/get-application/:id", getSingleApplication);
router.patch("/update-applicant/:id", protect, updateApplicant);
router.delete("/delete-Application/:id", protect, deleteApplication);

module.exports = router;
