const express = require("express");
const commentController = require("../controllers/comment.controller");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const router = express.Router();

//todo this must be only for admin 
router
  .route("/")
  .get(verifyTokenAndUserCheck,commentController.getAllComments)
  .post(verifyTokenAndUserCheck,commentController.addComment)
  
  
router
  .route('/:id')
  .get(verifyTokenAndUserCheck,commentController.getCommentById)
  .patch(verifyTokenAndUserCheck,commentController.editComment)
  .delete(verifyTokenAndUserCheck,commentController.deleteComment)
  
  router
    .route("/reply/:id")
    .patch(verifyTokenAndUserCheck,commentController.addReply)
    .delete(verifyTokenAndUserCheck,commentController.deleteReply);


module.exports = router;
