import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    media: {
      images: [{ type: String }],
      videos: [{ type: String }],
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [
      {
        content: { type: String },
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Post", postSchema);
export default Posts;
