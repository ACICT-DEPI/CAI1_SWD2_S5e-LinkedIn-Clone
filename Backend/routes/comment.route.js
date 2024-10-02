const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

//todo this must be only for admin 
router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.addComment)
  
  
router
  .route('/:id')
  .get(commentController.getCommentById)
  .patch(commentController.editComment)
  .delete(commentController.deleteComment)

  router
    .route("/likes/:id")
    .patch(commentController.addLike)
    .delete(commentController.deleteLike);
  
  router
    .route("/reply/:id")
    .patch(commentController.addReply)
    .delete(commentController.deleteReply);


module.exports = router;
