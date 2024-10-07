const express = require("express");
const postController = require("../controllers/post.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const router = express.Router();

router.get("/admin", verifyToken, postController.getAllPosts);
router.get("/", verifyToken, postController.getFeedPosts);
router.patch("/share", verifyToken, postController.sharePost); // takes userId who repost and postId that is been reposted
router.get("/comments/:id", verifyToken, postController.getAllComments);
router.patch("/", verifyToken, postController.createPost);
router.get("/:id", verifyToken, postController.getPostById);
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
