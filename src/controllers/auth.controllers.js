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
        ...req.body,
        password: hashedPassword,
      });
      console.log(user);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function signin(req, res) {
  console.log(req);
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
        const token = jwt.sign(
          { id: preUser._id },
          process.env.JWT_SECRET
          // { expiresIn: "1h" }
        );
        // console.log(token);
        const prodOptions = {
          sameSite: "none",
          secure: true,
          domain: process.env.BACKEND,
        };
        console.log({ userId: preUser._id, token });
        res.cookie("token", token, prodOptions);
        res.cookie("user_id", preUser._id.toString(), prodOptions);
        res.status(200).json(preUser);
        /* res.status(200).json({
          userId: preUser._id,
          userType: preUser.userType,
          profilePic: preUser.profilePic,
          name: preUser.name,
          qualification: preUser.qualification,
          profileStatus: preUser.profileStatus,
          token,
        }); */
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = { signup, signin };
