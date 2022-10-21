require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const Tutor = require("../models/tutor.model");
const Notification = require("../models/notification.model");
const Institute = require("../models/institute.model");
const Admin = require("../models/admin.model");

//////////////////////////////////////////////////////////////////////////////
async function signup(req, res) {
  const { email, password, tutor, student, institute, admin } = req.body;
  console.log(email);
  console.log(tutor);
  try {
    const preUser = await User.findOne({ email: email });
    // console.log(preUser);
    if (preUser) {
      res.status(404).json({ error: "This user already exists" });
    } else {
      let userType = "";
      let userId = "";

      if (tutor) {
        const data = await Tutor.create({
          ...tutor,
        });
        await Notification.create({
          tutor_id: data._id,
          type: "warning",
          title: "Incomplete Profile!",
          msg: "Users cannot see an incomplete profile. Complete your profile in 'Edit Profile'",
        });

        await Notification.create({
          tutor_id: data._id,
          type: "danger",
          title: "Unverified Profile!",
          msg: "An unverified tutor cannot apply on Jobs. Pay your verification fee of Rs 1500 to 03328200082 Jazz cash",
        });

        userType = "tutor";
        userId = data._id;
      }

      if (student) {
        const data = await Student.create({
          ...student,
        });
        userType = "student";
        userId = data._id;
      }

      if (institute) {
        const data = await Institute.create({
          ...institute,
        });
        userType = "institute";
        userId = data._id;
      }

      /* if (admin) {
        const data = await Admin.create({
          ...admin,
        });
        userType = "admin";
        userId = data._id;
      }*/

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        email: email,
        password: hashedPassword,
        [userType]: userId,
        userType: userType,
      };

      console.log(userData);
      const user = await User.create({ ...userData });
      // console.log(user);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function signin(req, res) {
  console.log(req);
  const { email, password } = req.body;

  try {
    const preUser = await User.findOne({ email: email }).populate("institute");

    if (!preUser) {
      res.status(404).json({ error: "This user doesnot exist" });
    } else {
      console.log(preUser);
      const auth = await bcrypt.compare(password, preUser.password);
      // console.log(auth);
      if (!auth) {
        res.status(404).json({ error: "Password is incorrect" });
      } else {
        if (preUser.institute && !preUser.institute.isVerified) {
          res.status(404).json({ error: "Unverified User" });
        } else {
          const token = jwt.sign(
            { id: preUser._id },
            process.env.JWT_SECRET /* {
          expiresIn: "1h",
        } */
          );
          res.status(200).json({
            user_id: preUser._id,
            userType: preUser.userType,
            token,
          });
          /* res.status(200).json({
          user_id:
            preUser.tutor ||
            preUser.student ||
            preUser.institute ||
            preUser.admin,
          userType: preUser.userType,
          token,
        }); */
          /* {
        // console.log(token);
        // const prodOptions = {
        //   sameSite: "none",
        //   secure: true,
        //   path: "/",
        //   httpOnly: false,
        //   domain: ".lions-api.vercel.app",
        //   maxAge: 9999999,
        // };
        // const prodOptions = {};
        // console.log({ userId: preUser._id, token, prodOptions });
        // console.log({
        //   user_id:
        //     preUser.tutor ||
        //     preUser.student ||
        //     preUser.institute ||
        //     preUser.admin,
        //   token,
        // });
        // res.cookie("token", token, prodOptions);
        // res.cookie("user_id", preUser._id.toString(), prodOptions);
        } */
        }
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = { signup, signin };
