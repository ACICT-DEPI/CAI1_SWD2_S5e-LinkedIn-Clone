const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/users", adminController.renderUsersView);
router.get("/users/:userId", adminController.renderUserViewById);
router.get("/users/:userId/posts", adminController.renderAllUserPosts);
router.get("/users/:userId/comments", adminController.renderAllUserComments);
router.get(
  "/users/:userId/connections",
  adminController.renderAllUserConnections
);

router.get("/posts",adminController.renderAllPosts);

router.get("/comments",adminController.renderAllComments);
router.get("/comments/:id",adminController.renderCommentById);

router.get("*",(req,res)=>{
  res.render("error",{
    back_url:"/api/admin/users"
  })
})
module.exports = router;
