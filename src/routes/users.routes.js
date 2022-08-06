const express = require("express");

const {
  getUsers,
  getSingleUser,
  addUser,
  deleteUser,
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.post("/add-user", addUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
