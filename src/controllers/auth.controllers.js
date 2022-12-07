require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const Tutor = require("../models/tutor.model");
const Notification = require("../models/notification.model");
const Institute = require("../models/institute.model");
const Admin = require("../models/admin.model");
const Otp = require("../models/otp.model");
const nodemailer = require("nodemailer");

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
      const profileId = tutor.name.toLowerCase().replace(/ /g, "-");
      if (tutor) {
        const data = await Tutor.create({
          ...tutor, profileId
        });
        await Notification.create({
          tutor_id: data._id,
          type: "warning",
          title: "Incomplete Profile!",
          msg: "Parents cannot see an incomplete profile. Complete your profile in 'Edit Profile'",
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

//////////////////////////////////////////////////////////////////////////////
async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const preUser = await User.findOne({ email: email });
    if (!preUser) {
      res.status(404).json({ error: "This user doesnot exist" });
    } else {
      // console.log(preUser);
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      sendMail(preUser.email, otpCode);
      await Otp.create({
        email: preUser.email,
        otpCode: otpCode,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      res.status(200).json({ message: "Mail sent" });
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function verifyOtp(req, res) {
  const { otpCode, email } = req.body;
  try {
    const otpData = await Otp.findOne({ email, otpCode });
    if (!otpData) {
      res.status(404).json({ error: "Invalid Otp" });
    } else {
      const currentTime = new Date().getTime();
      const diff = otpData.expiresIn - currentTime;
      if (diff < 0) {
        await Otp.findByIdAndDelete(otpData._id);
        res.status(404).json({ error: "Token Expired" });
      } else {
        res.status(200).json({ message: "Otp verified successfully" });
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}
async function changePassword(req, res) {
  const { password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    res.status(404).send(error.message);
  }
}

function sendMail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "educationists.org.pk",
    to: email,
    subject: "Reset Password",
    text: `Verification code to reset your password is '${otp}'. This verification will expire after 5 min`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { signup, signin, verifyOtp, forgotPassword, changePassword };
