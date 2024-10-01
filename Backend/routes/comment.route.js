const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

//todo this must be only for admin 
router
  .route("/")
  .get(commentController.getAllComments)
  .put(commentController.addComment)
  
  
router
  .route('/:id')
  .patch(commentController.editComment)
  .delete(commentController.deleteComment)
  .patch(commentController.addLike)
  .patch(commentController.addReply)
  .delete(commentController.deleteLike)
  .delete(commentController.deleteReply);


module.exports = router;
