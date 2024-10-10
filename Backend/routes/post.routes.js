const express = require("express");
const postController = require("../controllers/post.controller.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const { verifyAndProtect } = require("../middleware/verifyAndProtect.js");
const router = express.Router();

router.get("/admin", verifyAndProtect, postController.getAllPosts);
router.get("/", verifyAndProtect, postController.getFeedPosts);
router.patch("/share", verifyAndProtect, postController.sharePost); // takes userId who repost and postId that is been reposted
router.get("/comments/:id", verifyAndProtect, postController.getAllComments);
router.patch("/", verifyAndProtect, postController.createPost);
router.get("/:id", verifyAndProtect, postController.getPostById);
router.delete("/:id", verifyAndProtect, postController.deletePost);

module.exports = router;
