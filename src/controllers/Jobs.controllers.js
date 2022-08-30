const Job = require("../models/job.model");
const Application = require("../models/application.model");

//////////////////////////////////////////////////////////////////////////////
async function addJob(req, res) {
  try {
    const job = Job.create(req.body);
    res.status(201).json(job);
    console.log(job);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getJobs(req, res) {
  const { query } = req;

  let filter = {};
  if (query.qualification) {
    filter["qualification"] = query.qualification;
  }
  if (query.subject) {
    filter["subjects"] = query.subject;
  }
  if (query.class) {
    filter["class"] = query.class;
  }
  /* if (query.city) {
    filter["locations.city"] = query.city;
  }
  if (query.place) {
    filter["locations.places"] = query.place;
  } */

  try {
    const jobs = await Job.find(filter).populate("user_id").exec();
    res.status(200).json(jobs);
    console.log(jobs);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getMyJobs(req, res) {
  try {
    const myJobs = await Job.find({ user_id: req.params.id })
      .populate("user_id")
      .exec();
    res.status(200).json(myJobs);
    console.log(myJobs);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleJob(req, res) {
  const JobId = req.params.id;
  try {
    const JobData = await Job.findById(JobId).populate("user_id").exec();
    res.status(200).json(JobData);
    console.log(JobData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateApplicants(req, res) {
  const JobId = req.params.id;
  try {
    const JobData = await Job.findById(JobId);
    const newApplicants = JobData.applicants.push(req.body);
    const updatedJob = await Job.findByIdAndUpdate(JobId, {
      applicants: newApplicants,
    });
    res.status(200).json(updatedJob);
    console.log(JobData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteJob(req, res) {
  const JobId = req.params.id;
  try {
    await Job.findByIdAndDelete(JobId);
    res.status(200).json({ msg: "Job Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  updateApplicants,
  getJobs,
  getMyJobs,
  getSingleJob,
  addJob,
  deleteJob,
};
