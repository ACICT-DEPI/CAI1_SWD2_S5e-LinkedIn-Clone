const express = require('express')
const postController = require('../controllers/post.controller.js')
const router = express.Router();

router.get("/", postController.getFeedPosts);
router.patch("/", postController.createPost);
router.get("/:id", postController.getPostById);
router.delete("/:id", postController.deletePost);

module.exports = router;
