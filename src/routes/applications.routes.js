const express = require("express");

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

router.post("/add-application", addApplication);
router.get("/get-applications", getApplications);
router.get("/get-myapplications/:id", getMyApplications);
router.get("/get-jobapplications/:id", getJobApplications);
router.get("/get-application/:id", getSingleApplication);
router.patch("/update-applicant/:id", updateApplicant);
router.delete("/delete-Application/:id", deleteApplication);

module.exports = router;
