const mongoose = require( "mongoose");

const postSchema = new mongoose.Schema(
  {
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: { type: String, required: true },
    media: {
      images: [{ type: String }],
      videos: [{ type: String }],
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
    comments: [
      {
        type:mongoose.Schema.ObjectId, 
        ref:"Comments"
      },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts ;