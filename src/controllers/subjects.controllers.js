const Subject = require("../models/subject.model");
const capitalize = require("../util/capitalize");

//////////////////////////////////////////////////////////////////////////////
async function addSubject(req, res) {
  const name = capitalize(req.body.name);
  try {
    const data = await Subject.create({ name: name });
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSubjects(req, res) {
  try {
    const data = await Subject.find();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleSubject(req, res) {
  const subjectId = req.params.id;
  try {
    const data = await Subject.findById(subjectId);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateSubject(req, res) {
  const subjectId = req.params.id;
  const name = capitalize(req.body.name);
  try {
    const data = await Subject.findByIdAndUpdate(subjectId, {
      name: name,
    });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteSubject(req, res) {
  const subjectId = req.params.id;
  try {
    await Subject.findByIdAndDelete(subjectId);
    res.status(200).json({ msg: "Subject Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addSubject,
  getSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
