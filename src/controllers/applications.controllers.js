const Application = require("../models/application.model");

//////////////////////////////////////////////////////////////////////////////
async function addApplication(req, res) {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
    console.log(application);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getApplications(req, res) {
  try {
    const applications = await Application.find()
      .populate("job_id")
      .populate("applicant_id")
      .exec();
    res.status(200).json(applications);
    console.log(applications);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getJobApplications(req, res) {
  try {
    const jobApplications = await Application.find({
      job_id: req.params.id,
    })
      .populate("job_id")
      .populate("applicant_id")
      .exec();
    res.status(200).json(jobApplications);
    console.log(jobApplications);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getMyApplications(req, res) {
  try {
    const myApplications = await Application.find({
      applicant_id: req.params.id,
    })
      .populate("applicant_id")
      .populate({
        path: "job_id",
        populate: {
          path: "user_id",
        },
      })
      .exec();
    res.status(200).json(myApplications);
    console.log(myApplications);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleApplication(req, res) {
  const ApplicationId = req.params.id;
  try {
    const ApplicationData = await Application.findById(ApplicationId)
      .populate("job_id")
      .populate("applicant_id")
      .exec();
    res.status(200).json(ApplicationData);
    console.log(ApplicationData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateApplicants(req, res) {
  const ApplicationId = req.params.id;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      ApplicationId,
      {
        isSelected: true,
      }
    );
    res.status(200).json(updatedApplication);
    console.log(updatedApplication);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteApplication(req, res) {
  const ApplicationId = req.params.id;
  try {
    await Application.findByIdAndDelete(ApplicationId);
    res.status(200).json({ msg: "Application Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addApplication,
  getApplications,
  getJobApplications,
  getMyApplications,
  getSingleApplication,
  updateApplicants,
  deleteApplication,
};
