const Application = require("../models/application.model");
const Job = require("../models/job.model");
const Tutor = require("../models/tutor.model");
const Notification = require("../models/notification.model");

//////////////////////////////////////////////////////////////////////////////
async function addApplication(req, res) {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
    // console.log(application);
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
    // console.log(applications);
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
    // console.log(jobApplications);
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
    // console.log(myApplications);
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
    // console.log(ApplicationData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function selectAppliction(req, res) {
  const ApplicationId = req.params.id;
  try {
    const application = await Application.findById(ApplicationId)
      .populate("applicant_id")
      .exec();
    const tutor = application.applicant_id;
    // console.log(application);

    await Application.findByIdAndUpdate(ApplicationId, {
      isSelected: application.isSelected ? false : true,
    });

    if (application.isSelected) {
      await Job.findByIdAndUpdate(application.job_id, {
        isOpen: false,
      });
    } else {
      await Job.findByIdAndUpdate(application.job_id, {
        isOpen: true,
      });
    }

    if (
      !application.isSelected &&
      !tutor.selectedJobs.includes(application.job_id)
    ) {
      // console.log("updating jobs");
      try {
        const data = await Tutor.findByIdAndUpdate(tutor._id, {
          selectedJobs: [...tutor.selectedJobs, application.job_id],
        });
        // console.log(data.selectedJobs);
      } catch (error) {
        console.log(error);
      }
    }

    res.status(200).json({
      msg: application.isSelected
        ? "Application Not Selected"
        : "Application Selected",
    });
    // console.log(updatedApplication);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function shortlistAppliction(req, res) {
  const ApplicationId = req.params.id;
  console.log(ApplicationId);
  try {
    const application = await Application.findById(ApplicationId)
      .populate("applicant_id")
      .exec();
    const tutor = application.applicant_id;
    // console.log(tutor);

    await Application.findByIdAndUpdate(ApplicationId, {
      isShortlisted: application.isShortlisted ? false : true,
    });

    if (
      !application.isShortlisted &&
      !tutor.shortlistedDemos.includes(application.job_id)
    ) {
      // console.log("updating demos");
      try {
        const data = await Tutor.findByIdAndUpdate(tutor._id, {
          shortlistedDemos: [...tutor.shortlistedDemos, application.job_id],
        });
        // console.log(data.shortlistedDemos);
      } catch (error) {
        console.log(error);
      }
    }

    res.status(200).json({
      msg: application.isShortlisted
        ? "Application Not Shortlisted"
        : "Application Shortlisted",
    });
    // console.log(updatedApplication);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function rejectAppliction(req, res) {
  const ApplicationId = req.params.id;
  try {
    const application = await Application.findById(ApplicationId);

    await Application.findByIdAndUpdate(ApplicationId, {
      isRejected: application.isRejected ? false : true,
    });
    res.status(200).json({
      msg: application.isRejected
        ? "Application Not Rejected"
        : "Application Rejected",
    });
    // console.log(updatedApplication);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateApplicant(req, res) {
  const ApplicationId = req.params.id;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      ApplicationId,
      { ...req.body }
    );
    res.status(200).json(updatedApplication);
    // console.log(updatedApplication);
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
  selectAppliction,
  shortlistAppliction,
  rejectAppliction,
  updateApplicant,
  deleteApplication,
};
