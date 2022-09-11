const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getAreas,
  getSingleArea,
  addArea,
  deleteArea,
  updateArea,
} = require("../controllers/area.controllers");

const router = express.Router();

router.post("/add-area", protect, addArea);
router.get("/get-areas", getAreas);
router.get("/get-area/:id", getSingleArea);
router.patch("/update-area/:id", protect, updateArea);
router.delete("/delete-area/:id", protect, deleteArea);

module.exports = router;
