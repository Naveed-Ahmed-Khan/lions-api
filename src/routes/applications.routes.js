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
  selectAppliction,
  rejectAppliction,
  shortlistAppliction,
} = require("../controllers/applications.controllers");

const router = express.Router();

router.post("/add-application", protect, addApplication);
router.get("/get-applications", getApplications);
router.get("/get-myapplications/:id", getMyApplications);
router.get("/get-jobapplications/:id", getJobApplications);
router.get("/get-application/:id", getSingleApplication);
router.get("/select-application/:id", selectAppliction);
router.get("/shortlist-application/:id", shortlistAppliction);
router.get("/reject-application/:id", rejectAppliction);
router.patch("/update-applicant/:id", protect, updateApplicant);
router.delete("/delete-Application/:id", protect, deleteApplication);

module.exports = router;
