const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getSingleCity,
  addCity,
  deleteCity,
  updateCity,
  getAllCities,
} = require("../controllers/city.controllers");

const router = express.Router();

router.post("/add-city", addCity);
router.get("/get-allcities", getAllCities);
router.get("/get-city/:id", getSingleCity);
router.patch("/update-city/:id", protect, updateCity);
router.delete("/delete-city/:id", protect, deleteCity);

module.exports = router;
