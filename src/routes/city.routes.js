const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getCities,
  getSingleCity,
  addCity,
  deleteCity,
  updateCity,
} = require("../controllers/city.controllers");

const router = express.Router();

router.post("/add-city", protect, addCity);
router.get("/get-cities", getCities);
router.get("/get-city/:id", getSingleCity);
router.patch("/update-city/:id", protect, updateCity);
router.delete("/delete-city/:id", protect, deleteCity);

module.exports = router;
