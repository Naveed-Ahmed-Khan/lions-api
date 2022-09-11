const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getAchievements,
  getSingleAchievement,
  addAchievement,
  deleteAchievement,
  updateAchievement,
} = require("../controllers/achievements.controllers");

const router = express.Router();

router.post("/add-achievement", protect, addAchievement);
router.get("/get-achievements", getAchievements);
router.get("/get-achievement/:id", getSingleAchievement);
router.patch("/update-achievement/:id", protect, updateAchievement);
router.delete("/delete-achievement/:id", protect, deleteAchievement);

module.exports = router;
