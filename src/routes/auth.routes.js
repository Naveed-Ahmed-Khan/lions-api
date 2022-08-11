const express = require("express");

const { signup, signin } = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
/* router.get("/get-users", getUsers);
router.get("/get-user/:id", getSingleUser);
router.delete("/delete-user/:id", deleteUser); */

module.exports = router;
