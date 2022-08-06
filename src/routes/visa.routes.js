const express = require("express");

const {
  getVisa,
  getSingleVisa,
  addVisa,
  deleteVisa,
} = require("../controllers/visa.controllers");

const router = express.Router();

router.get("/get-visa", getVisa);
router.get("/get-visa/:id", getSingleVisa);
router.post("/add-visa", addVisa);
router.delete("/delete-visa/:id", deleteVisa);

module.exports = router;
