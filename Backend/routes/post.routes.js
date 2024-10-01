import express from "express";

import {
  getFeedPosts,
  createPost,
  getPostById,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getFeedPosts);
router.patch("/", createPost);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

export default router;
