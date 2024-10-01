const express = require("express");
const {
  getSuggstedConnections,
  getPublicProfile,
  UpdateProfile,
  getAllUsers,
  getUserPosts,
  deleteUser,
} = require("../controllers/user.controller.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const router = express.Router();

//get
router.get("/", getAllUsers); //ok
router.get("/suggestions", protectRoute, getSuggstedConnections); //ok
router.get("/posts", getUserPosts);
router.get("/:id", protectRoute, getPublicProfile); //ok ,//example api call: http://localhost:5000/api/users/haneen
router.delete('/:id', deleteUser); //ok //deleting profile
// router.get("/:id", getUserById);

//put
router.put("/:id", UpdateProfile); //ok //updating profile

module.exports = router;
