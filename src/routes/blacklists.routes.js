const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getBlacklists,
  getSingleBlacklist,
  addBlacklist,
  deleteBlacklist,
  updateBlacklist,
} = require("../controllers/blacklists.controllers");

const router = express.Router();

router.post("/add-blacklist", addBlacklist);
router.get("/get-blacklists", getBlacklists);
router.get("/get-blacklist/:id", getSingleBlacklist);
router.patch("/update-blacklist/:id", protect, updateBlacklist);
router.delete("/delete-blacklist/:id", protect, deleteBlacklist);

module.exports = router;
