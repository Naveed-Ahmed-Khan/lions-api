const express = require("express");
const {
  updateQualifications,
  updateLocations,
} = require("../controllers/profile.controllers");

const router = express.Router();

router.patch("/update-qualifications/:id", updateQualifications);
router.patch("/update-locations/:id", updateLocations);

module.exports = router;
