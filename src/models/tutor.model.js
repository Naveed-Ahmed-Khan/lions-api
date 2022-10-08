const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;
const TutorSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  account_id: { type: Id, ref: "Account", default: null },
  institute_id: { type: Id, ref: "Institute", default: null },

  name: { type: String, required: true },
  cnic: { type: Number, required: false },
  birth: { type: String, required: false },
  gender: { type: String, required: false },

  profilePic: { type: String, required: false },
  bannerImage: { type: String, required: false },

  mobile: { type: Number, required: false },
  watsapp: { type: Number, required: false },
  city: { type: String, required: false },
  area: { type: String, required: false },
  address: { type: String, required: true },
  teachingModes: { type: Array, required: true },

  tag: { type: String, default: "none" },
  profileStatus: { type: String, default: "incomplete" },
  isBlacklisted: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },

  shortlistedDemos: [{ type: Id, ref: "Job", required: false }],
  selectedJobs: [{ type: Id, ref: "Job", required: false }],

  notifications: [
    {
      title: { type: String, required: true },
      msg: { type: String, required: true },
      type: { type: String, required: true },
      isRead: { type: Boolean, default: false },
    },
  ],

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
      degree: { type: String, required: true },
      institute: { type: String, required: true },
      passingYear: { type: Number, required: true },
    },
  ],

  slots: [
    {
      title: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
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
});

const Tutor = new mongoose.model("Tutor", TutorSchema);

module.exports = Tutor;
