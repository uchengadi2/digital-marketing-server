const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    member: {
      type: mongoose.Schema.ObjectId,
      ref: "Membership",
    },
    description: {
      type: String,
      trim: true,
    },

    connectedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    dateCreated: {
      type: Date,
      default: Date.now,
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

const Connection = mongoose.model("Connection", connectionSchema);
module.exports = Connection;
