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

module.exports = router;
