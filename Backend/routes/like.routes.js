const express = require("express");
const likeController = require("../controllers/like.controller");
const router = express.Router();

router
  .route("/")
  .post(likeController.addLike)
  .delete(likeController.deleteLike);

module.exports = router;
