const mongoose = require("mongoose");

const noticeBoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the name of the cluster"],
    },
    headline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: "announcement",
      enum: [
        "announcement",
        "job-posting",
        "launching",
        "invitation",
        "observation",
        "request-for-proposal",
        "request-for-information",
        "request-for-quotation",
        "others",
      ],
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
    video: {
      type: String,
    },
    imageLink: {
      type: String,
    },
    noticeRefNo: {
      type: String,
    },
    targetAudience: {
      type: String,
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

const NoticeBoard = mongoose.model("NoticeBoard", noticeBoardSchema);
module.exports = NoticeBoard;
