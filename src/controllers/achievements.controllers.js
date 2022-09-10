const Achievement = require("../models/achievement.model");

//////////////////////////////////////////////////////////////////////////////
async function addAchievement(req, res) {
  try {
    const data = await Achievement.create(req.body);
    res.status(201).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getAchievements(req, res) {
  try {
    const data = await Achievement.find();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleAchievement(req, res) {
  const achievementId = req.params.id;
  try {
    const data = await Achievement.findById(achievementId);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateAchievement(req, res) {
  const achievementId = req.params.id;
  try {
    const data = await Achievement.findByIdAndUpdate(achievementId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteAchievement(req, res) {
  const achievementId = req.params.id;
  try {
    await Achievement.findByIdAndDelete(achievementId);
    res.status(200).json({ msg: "Achievement Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addAchievement,
  getAchievements,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement,
};
