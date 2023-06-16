const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    membershipNo: {
      type: String,
    },

    headline: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    profession: {
      type: String,
    },
    qualification: {
      type: String,
    },
    experiences: {
      type: String,
    },
    achievements: {
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    facebookPage: {
      type: String,
    },
    instagramPage: {
      type: String,
    },
    youtubeChannel: {
      type: String,
    },
    twitterHandle: {
      type: String,
    },
    linkedInProfile: {
      type: String,
    },
    location: {
      type: String,
    },
    canAddMeToNetwork: {
      type: Boolean,
      default: true,
      enum: [false, true],
    },
    contactEmail: {
      type: String,
    },
    contactPhoneNumber: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    dateCreated: {
      type: Date,
      default: Date.now,
    },
    totalConnection: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    defaultThumbnail: {
      type: String,
      default: "membership.png",
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active"],
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Membership = mongoose.model("Membership", membershipSchema);
module.exports = Membership;
