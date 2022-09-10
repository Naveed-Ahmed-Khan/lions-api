const Class = require("../models/class.model");
const capitalize = require("../util/capitalize");

//////////////////////////////////////////////////////////////////////////////
async function addClass(req, res) {
  const name = capitalize(req.body.name);
  try {
    const data = await Class.create({ name: name });
    res.status(201).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getClasses(req, res) {
  try {
    const data = await Class.find();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleClass(req, res) {
  const classId = req.params.id;
  try {
    const data = await Class.findById(classId);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateClass(req, res) {
  const classId = req.params.id;
  const name = capitalize(req.body.name);
  try {
    const data = await Class.findByIdAndUpdate(classId, {
      name: name,
    });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteClass(req, res) {
  const classId = req.params.id;
  try {
    await Class.findByIdAndDelete(classId);
    res.status(200).json({ msg: "Class Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addClass,
  getClasses,
  getSingleClass,
  updateClass,
  deleteClass,
};
