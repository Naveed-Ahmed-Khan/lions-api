const express = require("express");

const {
  getSupplications,
  getSingleSupplication,
  addSupplication,
  deleteSupplication,
} = require("../controllers/supplications.controllers");

const router = express.Router();

router.get("/get-supplications", getSupplications);
router.get("/get-supplication/:id", getSingleSupplication);
router.post("/add-supplication", addSupplication);
router.delete("/delete-supplication/:id", deleteSupplication);

module.exports = router;
