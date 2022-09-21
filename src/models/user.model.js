const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

  tutor: { type: Id, ref: "Tutor", default: null },
  student: { type: Id, ref: "Student", default: null },
  admin: { type: Id, ref: "Admin", default: null },
  institute: { type: Id, ref: "Institute", default: null },

  name: { type: String, required: false },
  cnic: { type: Number, required: false },
  birth: { type: String, required: false },
  gender: { type: String, required: false },

  mobile: { type: Number, required: false },
  watsapp: { type: Number, required: false },
  city: { type: String, required: false },
  area: { type: String, required: false },
  address: { type: String, required: false },
  profilePic: { type: String, required: false },
  bannerImage: { type: String, required: false },
  teachingMode: { type: String, required: false },
  teachingModes: { type: Array, required: false },
  aboutMe: { type: String, required: false },
  achievements: { type: String, required: false },

  availableFrom: { type: String, required: false },
  availableTo: { type: String, required: false },

  allLocations: { type: Array, required: false },
  allSubjects: { type: Array, required: false },
  allClasses: { type: Array, required: false },
  highestQualification: { type: Object, required: false },

  userType: { type: String, required: true },
  userStatus: { type: String, required: false },
  profileStatus: { type: String, default: "incomplete" },
  tag: { type: String, required: false },
  isBlacklisted: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

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
      institute: { type: String, required: false },
      years: { type: Number, required: false },
      months: { type: Number, required: false },
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
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
