const express = require("express");

const {
  signup,
  signin,
  forgotPassword,
  changePassword,
  verifyOtp,
} = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/change-password", changePassword);
/* router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.delete("/delete-user/:id", deleteUser); */

module.exports = router;
