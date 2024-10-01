const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "user",
    },
    bannerImg: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    skills: [String],
    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    connection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
			type: Boolean,
			default: false,
		},
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },

  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
