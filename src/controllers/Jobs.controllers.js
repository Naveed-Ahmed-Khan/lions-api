const Job = require("../models/job.model");
const Application = require("../models/application.model")
const pagination = require("../util/pagination");

//////////////////////////////////////////////////////////////////////////////
async function addJob(req, res) {
  try {
    const job = Job.create(req.body);
    res.status(201).json(job);
    // console.log(job);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getPaginatedJobs(req, res) {
  const { query } = req;

  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "7");
  const skip = (page - 1) * limit;

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
  if (query.city) {
    filter["location.city"] = query.city;
  }
  if (query.area) {
    filter["location.place"] = query.area;
  }
  if (query.name) {
    filter["title"] = { $regex: query.name, $options: "i" };
  }

  try {
    const docLength = await Job.countDocuments(filter).exec();
    let jobIds = []

    const jobs = await Job.find(filter)
      .populate({ path: "user_id", select: ["_id", "name"] })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();
    jobs.forEach(job => jobIds.push(job._id))
    console.log(jobIds)

    const applications = await Application.find({
      'job_id': {
        $in: jobIds
      }
    }, {
      _id: 1,
      job_id: 1,
      applicant_id: 1,
    })

    console.log(applications)

    const pageData = pagination(docLength, page, limit);

    res.status(200).json({ pageData, jobs, applications });
    // console.log(jobs);
  } catch (error) {
    res.status(404).json({ error: error.message });
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
  if (query.city) {
    filter["location.city"] = query.city;
  }
  if (query.area) {
    filter["location.place"] = query.area;
  }

  try {
    const jobs = await Job.find(filter)
      .sort({ _id: -1 })
      .populate({ path: "user_id", select: ["_id", "name"] })
      .exec();

    res.status(200).json(jobs);
    // console.log(jobs);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getFeaturedJobs(req, res) {
  try {
    const jobs = await Job.find({ isFeatured: true })
      .populate({ path: "user_id", select: ["_id", "name"] })
      .exec();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getMyJobs(req, res) {
  try {
    const myJobs = await Job.find({ user_id: req.params.id })
      .sort({ _id: -1 })
      .populate({ path: "user_id", select: ["_id", "name"] })
      .exec();
    res.status(200).json(myJobs);
    // console.log(myJobs);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleJob(req, res) {
  const JobId = req.params.id;
  try {
    const JobData = await Job.findById(JobId)
      .populate({ path: "user_id", select: ["_id", "name"] })
      .exec();
    res.status(200).json(JobData);
    // console.log(JobData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function changeJobStatus(req, res) {
  const JobId = req.params.id;
  try {
    const job = await Job.findById(JobId);

    await Job.findByIdAndUpdate(JobId, {
      isOpen: job.isOpen ? false : true,
    });
    res.status(200).json({
      msg: job.isOpen ? "Job Not Open" : "Job Open",
    });

    // console.log(JobData);
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
    // console.log(JobData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function featureJob(req, res) {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);

    await Job.findByIdAndUpdate(jobId, {
      isFeatured: job.isFeatured ? false : true,
    });

    res.status(200).json({
      msg: job?.isFeatured ? "Job unfeatured" : "Job featured",
    });
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
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
  getPaginatedJobs,
  getFeaturedJobs,
  getMyJobs,
  getSingleJob,
  featureJob,
  changeJobStatus,
  addJob,
  deleteJob,
};
