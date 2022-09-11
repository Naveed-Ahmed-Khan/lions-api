const User = require("../models/user.model");

//////////////////////////////////////////////////////////////////////////////
async function addUser(req, res) {
  const { firstName, lastName, email, contact, address, profilePic, password } =
    req.body;
  try {
    const preUser = await User.findOne({ email: email });
    console.log(preUser);
    if (preUser) {
      res.status(404).send("This user already exists");
    } else {
      const addUser = new User({
        firstName,
        lastName,
        email,
        password,
        contact,
        address,
        profilePic,
      });
      await addUser.save();
      res.status(201).json(addUser);
      // console.log(addUser);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getTutors(req, res) {
  const { query } = req;

  let filter = { userType: "tutor" };
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
    const tutors = await User.find(filter);
    res.status(200).json(tutors);
    // console.log(tutors);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getStudents(req, res) {
  try {
    const students = await User.find({ userType: "student" });
    res.status(200).json(students);
    // console.log(students);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getUsers(req, res) {
  try {
    const usersData = await User.find();
    res.status(200).json(usersData);
    // console.log(usersData);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleUser(req, res) {
  const userId = req.params.id;
  try {
    const userData = await User.findById(userId);
    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error: error.message });
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
    res.status(404).send({ error: error.message });
  }
} */

//////////////////////////////////////////////////////////////////////////////
async function updateTutorProfile(req, res) {
  const userId = req.params.id;
  try {
    const userData = await User.findByIdAndUpdate(userId, { ...req.body });

    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  getUsers,
  getTutors,
  getStudents,
  getSingleUser,
  addUser,
  deleteUser,
  updateTutorProfile,
};
