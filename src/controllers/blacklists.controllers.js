const Blacklist = require("../models/blacklist.model");
const Tutor = require("../models/tutor.model");

//////////////////////////////////////////////////////////////////////////////
async function addBlacklist(req, res) {
  const { name, cnic, watsapp, city, profilePic, reason, user_id, userModel } =
    req.body;
  try {
    const tutor = await Tutor.create({ name, cnic, watsapp, profilePic, city });
    const data = await Blacklist.create({
      tutor_id: tutor._id,
      user_id:user_id,
      userModel:userModel,
      reason:reason,
    });
    res.status(201).json(data);
    console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getBlacklists(req, res) {
  try {
    const data = await Blacklist.find()
      .sort({ _id: -1 })
      .populate("tutor_id")
      .populate("user_id")
      .exec();

    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleBlacklist(req, res) {
  const blacklistId = req.params.id;
  try {
    const data = await Blacklist.findById(blacklistId)
      .populate("tutor_id")
      .populate("user_id")
      .exec();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateBlacklist(req, res) {
  const blacklistId = req.params.id;
  try {
    const data = await Blacklist.findByIdAndUpdate(blacklistId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(JobData);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteBlacklist(req, res) {
  const blacklistId = req.params.id;
  try {
    await Blacklist.findByIdAndDelete(blacklistId);
    res.status(200).json({ msg: "Blacklist Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addBlacklist,
  getBlacklists,
  getSingleBlacklist,
  updateBlacklist,
  deleteBlacklist,
};
