const express = require("express");

const {
  getAchievements,
  getSingleAchievement,
  addAchievement,
  deleteAchievement,
  updateAchievement,
} = require("../controllers/achievements.controllers");

const router = express.Router();

router.post("/add-achievement", addAchievement);
router.get("/get-achievements", getAchievements);
router.get("/get-achievement/:id", getSingleAchievement);
router.patch("/update-achievement/:id", updateAchievement);
router.delete("/delete-achievement/:id", deleteAchievement);

module.exports = router;
