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
  getUserComments,
  addSection,
  addExperience,
  addSkills,
  addEducation,
} = require("../controllers/user.controller.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const router = express.Router();

//get
router.get("/", getAllUsers); //ok
router.get("/suggestions", getSuggstedConnections); //ok
router.get("/posts", getUserPosts);
router.get("/comments", getUserComments);
router.get("/:id", getPublicProfile); //ok ,//example api call: http://localhost:5000/api/users/haneen
router.get("/:id", addSection);

//delete
router.delete("/:id", deleteUser); //ok //deleting profile

//post
router.post("/:id/experience", addExperience);
router.post("/:id/education", addEducation);
router.post("/:id/skill", addSkills);
router.post("/:id/section", addSection);

//put
router.post(
  "/:id",
  upload.fields([{ name: "profilePicture" }, { name: "bannerImg" }]),
  UpdateProfile
); //ok //updating profile

module.exports = router;
