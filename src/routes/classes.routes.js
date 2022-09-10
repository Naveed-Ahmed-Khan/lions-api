const express = require("express");

const {
  getClasses,
  getSingleClass,
  addClass,
  deleteClass,
  updateClass,
} = require("../controllers/classes.controllers");

const router = express.Router();

router.post("/add-class", addClass);
router.get("/get-classes", getClasses);
router.get("/get-class/:id", getSingleClass);
router.patch("/update-class/:id", updateClass);
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
