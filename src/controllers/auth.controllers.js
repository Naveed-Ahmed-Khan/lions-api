require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//////////////////////////////////////////////////////////////////////////////
async function signup(req, res) {
  try {
    const preUser = await User.findOne({ email: req.body.email });
    console.log(preUser);
    if (preUser) {
      res.status(404).json({ error: "This user already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        profilePic: req.body.profilePic,
        password: hashedPassword,
      });
      console.log(user);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function signin(req, res) {
  try {
    const preUser = await User.findOne({ email: req.body.email });
    if (!preUser) {
      res.status(404).json({ error: "This user doesnot exist" });
    } else {
      // console.log(preUser);
      const auth = await bcrypt.compare(req.body.password, preUser.password);
      // console.log(auth);
      if (!auth) {
        res.status(404).json({ error: "Password is incorrect" });
      } else {
        const token = await jwt.sign(
          { id: preUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        // console.log(token);
        res.status(200).json({ userID: preUser._id, token });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { signup, signin };
