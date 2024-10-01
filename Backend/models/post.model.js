import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, lowercase: true },
});

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
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Post", postSchema);
const Tag = mongoose.model("Tag", tagSchema);

export default { Posts, Tag };
