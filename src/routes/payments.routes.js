const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const {
  getPayments,
  getSinglePayment,
  addPayment,
  deletePayment,
  updatePayment,
  getTutorPayment,
  getJobPayment,
} = require("../controllers/payments.controllers");

const router = express.Router();

router.post("/add-payment", protect, addPayment);
router.get("/get-payments", getPayments);
router.get("/get-payment/:id", getSinglePayment);
router.get("/get-tutor-payment/:id", protect, getTutorPayment);
router.get("/get-job-payment/:id", protect, getJobPayment);
router.patch("/update-payment/:id", protect, updatePayment);
router.delete("/delete-payment/:id", protect, deletePayment);

module.exports = router;
