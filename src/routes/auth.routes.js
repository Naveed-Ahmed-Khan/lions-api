const express = require("express");

const {
  signup,
  signin,
  forgetPassword,
  changePassword,
} = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forget-password", forgetPassword);
router.post("/change-password", changePassword);
/* router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.delete("/delete-user/:id", deleteUser); */

module.exports = router;
