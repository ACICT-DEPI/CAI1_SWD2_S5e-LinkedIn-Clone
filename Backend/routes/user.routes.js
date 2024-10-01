const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../uploads/") });
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
router.delete("/:id", deleteUser); //ok //deleting profile
// router.get("/:id", getUserById);

//put
router.post(
  "/:id",
  upload.fields([{ name: "profilePicture" }, { name: "bannerImg" }]),
  UpdateProfile
); //ok //updating profile

module.exports = router;
