const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the name of the cluster"],
    },
    headline: {
      type: String,
    },
    description: {
      type: String,
    },
    objective: {
      type: String,
    },

    sponsor: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    defaultThumbnail: {
      type: String,
    },
    estimatedCost: {
      type: Number,
    },
    duration: {
      type: String,
    },
    beneficiary: {
      type: String,
    },
    willNeedDonations: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    contactPersonDetails: {
      type: String,
    },
    video: {
      type: String,
    },
    imageLink: {
      type: String,
    },
    projectRefNo: {
      type: String,
    },

    status: {
      type: String,
      default: "yet-to-start",
      enum: ["yet-to-start", "on-going", "completed", "cancel", "suspended"],
    },
    slug: {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
