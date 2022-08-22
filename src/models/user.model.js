const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  cnic: { type: Number, required: false },
  birth: { type: String, required: false },
  gender: { type: String, required: false },

  mobile: { type: Number, required: false },
  watsapp: { type: Number, required: false },
  city: { type: String, required: true },
  address: { type: String, required: true },
  profilePic: { type: String, required: false },
  bannerImage: { type: String, required: false },
  teachingMode: { type: String, required: false },
  aboutMe: { type: String, required: false },
  achievements: { type: String, required: false },

  jobTitle: { type: String, required: false },
  jobInstitute: { type: String, required: false },
  experience: { type: Number, required: false },
  subjects: { type: Array, required: false },
  classes: { type: Array, required: false },

  locations: [
    {
      city: { type: String, required: false },
      places: [{ type: String, required: false }],
    },
  ],

  subjectsTaught: [
    {
      name: { type: String, required: false },
      classes: [
        {
          title: { type: String, required: false },
          rate: { type: String, required: false },
        },
      ],
    },
  ],

  qualifications: [
    {
      degree: { type: String, required: false },
      institute: { type: String, required: false },
      passingYear: { type: Number, required: false },
    },
  ],

  experience: [
    {
      institute: { type: String, required: true },
      years: { type: Number, required: true },
      months: { type: Number, required: true },
    },
  ],

  sections: [
    {
      type: { type: String, required: false },
      title: { type: String, required: false },
      subSections: [
        {
          heading: { type: String, required: false },
          content: { type: String, required: false },
        },
      ],
    },
  ],

  reviews: [
    {
      user_id: { type: Id, ref: "User" },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: false },
    },
  ],

  userType: { type: String, required: false },
  userStatus: { type: String, required: false },
  tag: { type: String, required: false },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
