const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getJobs,
  getMyJobs,
  getSingleJob,
  addJob,
  deleteJob,
  updateApplicants,
} = require("../controllers/Jobs.controllers");

const router = express.Router();

router.post("/add-job", protect, addJob);
router.get("/get-jobs", getJobs);
router.get("/get-myjobs/:id", getMyJobs);
router.get("/get-job/:id", getSingleJob);
router.patch("/update-applicants/:id", protect, updateApplicants);
router.delete("/delete-job/:id", protect, deleteJob);

module.exports = router;
