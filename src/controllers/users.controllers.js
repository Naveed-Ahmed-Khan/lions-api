const User = require("../models/user.model");
const Student = require("../models/student.model");
const Tutor = require("../models/tutor.model");
const Institute = require("../models/institute.model");
const Authenticator = require("../models/authenticator.model");

//////////////////////////////////////////////////////////////////////////////
async function getCompleteTutors(req, res) {
  const { query } = req;

  // let filter = {};
  let filter = { profileStatus: "complete" };

  if (query.qualification) {
    filter["qualifications.degree"] = query.qualification;
  }
  if (query.subject) {
    filter["subjectsTaught.name"] = query.subject;
  }
  if (query.class) {
    filter["subjectsTaught.classes.title"] = query.class;
  }
  if (query.city) {
    filter["locations.city"] = query.city;
  }
  if (query.area) {
    filter["locations.places"] = query.area;
  }

  // console.log(filter);
  try {
    const tutors = await Tutor.find(filter);
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getTutors(req, res) {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getFeaturedTutors(req, res) {
  try {
    const tutors = await Tutor.find(
      { email: { $exists: true }, isFeatured: true },
      {
        bannerImage: 0,
        notifications: 0,
        // locations: 0,
        // subjectsTaught: 0,
        // qualifications: 0,
        slots: 0,
        experience: 0,
        sections: 0,
      }
    )
      .sort({ _id: -1 })
      .exec();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).send({ error });
  }
}
//////////////////////////////////////////////////////////////////////////////
async function getTutorsWithoutPics(req, res) {
  try {
    const tutors = await Tutor.find(
      { email: { $exists: true } },
      {
        profilePic: 0,
        bannerImage: 0,
        notifications: 0,
        locations: 0,
        subjectsTaught: 0,
        qualifications: 0,
        slots: 0,
        experience: 0,
        sections: 0,
      }
    )
      .sort({ _id: -1 })
      .exec();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getTutorsWithPics(req, res) {
  try {
    const tutors = await Tutor.find(
      { email: { $exists: true }, profileStatus: "complete" },
      {
        _id: 1,
        profilePic: 1,
        // bannerImage: 0,
        // notifications: 0,
        // locations: 0,
        // subjectsTaught: 0,
        // qualifications: 0,
        // slots: 0,
        // experience: 0,
        // sections: 0,
        // teachingModes: 0,
      }
    )
      .sort({ _id: -1 })
      .exec();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getTutorsWithoutProfilePicOnly(req, res) {
  try {
    const tutors = await Tutor.find(
      { email: { $exists: true }, profileStatus: "complete" },
      {
        profilePic: 0,
        bannerImage: 0,
        notifications: 0,
        locations: 0,
        // subjectsTaught: 0,
        // qualifications: 0,
        slots: 0,
        experience: 0,
        // sections: 0,
        // teachingModes: 0,
      }
    )
      .sort({ _id: -1 })
      .exec();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getStudents(req, res) {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getInstitutes(req, res) {
  try {
    const institutes = await Institute.find({}, { profilePic: 0, cnicPic: 0 })
      .sort({ _id: -1 })
      .exec();
    res.status(200).json(institutes);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getUsers(req, res) {
  try {
    const usersData = await User.find()
      .populate("student")
      .populate("tutor")
      .populate("institute")
      .populate("admin")
      .exec();
    res.status(200).json(usersData);
    // console.log(usersData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleTutor(req, res) {
  const userId = req.params.id;
  try {
    const userData = await Tutor.findById(userId);
    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleInstitute(req, res) {
  const userId = req.params.id;
  try {
    const instituteData = await Institute.findById(userId);
    res.status(200).json(instituteData);
    // console.log(instituteData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleUser(req, res) {
  const userId = req.params.id;
  try {
    const userData = await User.findById(userId)
      .populate("student")
      .populate("tutor")
      .populate("institute")
      .populate("admin")
      .populate("authenticator")
      .exec();
    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

/* //////////////////////////////////////////////////////////////////////////////
async function getSingleUser(req, res) {
  const name = req.params.id;
  try {
    const userData = await User.findOne({ name: name });
    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
} */

//////////////////////////////////////////////////////////////////////////////
async function verifyTutor(req, res) {
  const userId = req.params.id;

  try {
    // const user = await User.findById(userId);
    const tutor = await Tutor.findById(userId);
    // console.log(tutor);

    await Tutor.findByIdAndUpdate(userId, {
      // Check if user is blacklisted, set isBlacklisted to false and vice versa
      isVerified: tutor.isVerified ? false : true,
    });

    res.status(200).json({
      msg: tutor.isVerified
        ? "User removed from verified list"
        : "User added to verified list",
    });
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function verifyInstitute(req, res) {
  const instituteId = req.params.id;

  try {
    const institute = await Institute.findById(instituteId);
    // console.log(institute);

    await Institute.findByIdAndUpdate(instituteId, {
      // Check if user is blacklisted, set isBlacklisted to false and vice versa
      isVerified: institute.isVerified ? false : true,
    });

    res.status(200).json({
      msg: institute.isVerified
        ? "Institute removed from verified list"
        : "Institute added to verified list",
    });
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function blacklistTutor(req, res) {
  const userId = req.params.id;

  try {
    // const user = await User.findById(userId);
    const tutor = await Tutor.findById(userId);

    await Tutor.findByIdAndUpdate(userId, {
      // Check if user is blacklisted, set isBlacklisted to false and vice versa
      isBlacklisted: tutor.isBlacklisted ? false : true,
    });

    res.status(200).json({
      msg: tutor?.isBlacklisted
        ? "User removed from blacklist"
        : "User added to blacklist",
    });
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function featureTutor(req, res) {
  const userId = req.params.id;

  try {
    // const user = await User.findById(userId);
    const tutor = await Tutor.findById(userId);

    await Tutor.findByIdAndUpdate(userId, {
      // Check if user is blacklisted, set isBlacklisted to false and vice versa
      isFeatured: tutor.isFeatured ? false : true,
    });

    res.status(200).json({
      msg: tutor?.isFeatured ? "User unfeatured" : "User featured",
    });
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateTutorProfile(req, res) {
  const userId = req.params.id;
  try {
    // const user = await User.findById(userId);
    await Tutor.findByIdAndUpdate(userId, { ...req.body });

    res.status(200).json({ msg: "Tutor profile updated " });
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateInstitute(req, res) {
  const instituteId = req.params.id;
  try {
    const data = await Institute.findByIdAndUpdate(instituteId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (user.tutor) {
      await Tutor.findByIdAndDelete(user.tutor);
    }
    if (user.student) {
      await Student.findByIdAndDelete(user.student);
    }
    /* if (user.institute) {
      await Institute.findByIdAndDelete(user.institute);
    } */
    await User.findByIdAndDelete(userId);

    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

module.exports = {
  getUsers,
  getCompleteTutors,
  getInstitutes,
  getSingleInstitute,
  verifyInstitute,
  getTutorsWithoutProfilePicOnly,
  getTutorsWithoutPics,
  getTutorsWithPics,
  getFeaturedTutors,
  getTutors,
  getStudents,
  getSingleUser,
  getSingleTutor,
  updateTutorProfile,
  updateInstitute,
  blacklistTutor,
  featureTutor,
  verifyTutor,
  deleteUser,
};
