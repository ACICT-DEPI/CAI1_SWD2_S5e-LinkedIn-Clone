const express = require("express");

const postController = require("../controllers/post.controller.js");

const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/admin", verifyTokenAndUserCheck, postController.getAllPosts);
router.get("/", verifyTokenAndUserCheck, postController.getFeedPosts);
router.patch("/share", verifyTokenAndUserCheck, postController.sharePost); // takes userId who repost and postId that is been reposted
router.get("/comments/:id", verifyTokenAndUserCheck, postController.getAllComments);
router.post(
  "/",
  verifyTokenAndUserCheck,
  postController.createPost
);
router.get("/:id", verifyTokenAndUserCheck, postController.getPostById);
router.delete("/:id", verifyTokenAndUserCheck, postController.deletePost);

module.exports = router;
