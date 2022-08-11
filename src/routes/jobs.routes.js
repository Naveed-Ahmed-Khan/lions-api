const express = require("express");

const {
  getJobs,
  getMyJobs,
  getSingleJob,
  addJob,
  deleteJob,
} = require("../controllers/Jobs.controllers");

const router = express.Router();

router.post("/add-job", addJob);
router.get("/get-jobs", getJobs);
router.get("/get-myjobs/:id", getMyJobs);
router.get("/get-job/:id", getSingleJob);
router.delete("/delete-job/:id", deleteJob);

module.exports = router;
