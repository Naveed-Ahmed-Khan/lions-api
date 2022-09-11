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
  area: { type: String, required: false },
  address: { type: String, required: true },
  profilePic: { type: String, required: false },
  bannerImage: { type: String, required: false },
  teachingMode: { type: String, required: false },
  teachingModes: { type: Array, required: true },
  aboutMe: { type: String, required: false },
  achievements: { type: String, required: false },

  availableFrom: { type: String, required: false },
  availableTo: { type: String, required: false },

  allLocations: { type: Array, required: true },
  allSubjects: { type: Array, required: true },
  allClasses: { type: Array, required: true },
  highestQualification: { type: Object, required: false },

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

  userType: { type: String, required: false },
  userStatus: { type: String, required: false },
  profileStatus: { type: String, default: "incomplete" },
  tag: { type: String, required: false },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
