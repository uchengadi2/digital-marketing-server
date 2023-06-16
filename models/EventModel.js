const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [false, "Please provide the name of the cluster"],
    },
    headline: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      default: "party",
      enum: [
        "party",
        "eyp",
        "get-together",
        "seminar",
        "conference",
        "celebration",
        "project-commissioning",
        "training",
        "counselling",
        "ceremony",
        "anniversary",
        "thanksgiving",
        "others",
      ],
    },
    year: {
      type: String,
      enum: ["2020", "2021", "2022", "2023", "2024"],
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
    },
    sponsor: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    defaultThumbnail: {
      type: String,
      default: "event.png",
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    video: {
      type: String,
    },
    extraImages: {
      type: String,
    },
    slug: {
      type: String,
    },
    images: [String],

    dateCreated: {
      type: Date,
      default: Date.now,
    },
    eventNo: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
