const express = require("express");

const {
  getAreas,
  getSingleArea,
  addArea,
  deleteArea,
  updateArea,
} = require("../controllers/area.controllers");

const router = express.Router();

router.post("/add-area", addArea);
router.get("/get-areas", getAreas);
router.get("/get-area/:id", getSingleArea);
router.patch("/update-area/:id", updateArea);
router.delete("/delete-area/:id", deleteArea);

module.exports = router;
