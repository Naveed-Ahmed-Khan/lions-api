const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getBlacklists,
  getSingleBlacklist,
  addBlacklist,
  deleteBlacklist,
  updateBlacklist,
  getCompleteBlacklists,
} = require("../controllers/blacklists.controllers");

const router = express.Router();

router.post("/add-blacklist", addBlacklist);
router.get("/get-blacklists", getBlacklists);
router.get("/get-all-blacklists", getCompleteBlacklists);
router.get("/get-blacklist/:id", getSingleBlacklist);
router.patch("/update-blacklist/:id",  updateBlacklist);
router.delete("/delete-blacklist/:id",  deleteBlacklist);

module.exports = router;
