const mongoose = require( "mongoose");

const postSchema = new mongoose.Schema(
  {
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    reshare: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comments",
      },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts ;