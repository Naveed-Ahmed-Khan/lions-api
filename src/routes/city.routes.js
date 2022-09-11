const express = require("express");

const {
  getCities,
  getSingleCity,
  addCity,
  deleteCity,
  updateCity,
} = require("../controllers/city.controllers");

const router = express.Router();

router.post("/add-city", addCity);
router.get("/get-cities", getCities);
router.get("/get-city/:id", getSingleCity);
router.patch("/update-city/:id", updateCity);
router.delete("/delete-city/:id", deleteCity);

module.exports = router;
