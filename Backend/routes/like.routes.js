const express = require("express");
const likeController = require("../controllers/like.controller");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndUserCheck, likeController.addLike)
  .delete(verifyTokenAndUserCheck, likeController.deleteLike);

module.exports = router;
