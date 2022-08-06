const express = require("express");

const {
  getGroups,
  getSingleGroup,
  addGroup,
  deleteGroup,
} = require("../controllers/groups.controllers");

const router = express.Router();

router.get("/get-groups", getGroups);
router.get("/get-group/:id", getSingleGroup);
router.post("/add-group", addGroup);
router.delete("/delete-group/:id", deleteGroup);

module.exports = router;
