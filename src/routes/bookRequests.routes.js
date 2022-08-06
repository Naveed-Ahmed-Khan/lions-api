const express = require("express");

const {
  getBookRequests,
  getSingleBookRequest,
  addBookRequest,
  deleteBookRequest,
} = require("../controllers/bookRequest.controllers");

const router = express.Router();

router.get("/get-bookRequests", getBookRequests);
router.get("/get-bookRequest/:id", getSingleBookRequest);
router.post("/add-bookRequest", addBookRequest);
router.delete("/delete-bookRequest/:id", deleteBookRequest);

module.exports = router;
