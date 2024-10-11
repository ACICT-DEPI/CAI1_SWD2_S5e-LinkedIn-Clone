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
  getNotification,
  addNotificationToUser,
  getUserConnections,
} = require("../controllers/user.controller.js");

const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

//get
router.get("/", verifyToken,getAllUsers);
router.get("/suggestions",verifyToken, getSuggstedConnections);
router.get("/connections",verifyToken, getUserConnections);
router.get("/posts",verifyToken, getUserPosts);
router.get("/comments", verifyToken,getUserComments);
router.get("/:id",verifyToken, getPublicProfile); //example api call: http://localhost:5000/api/users/haneen
router.get("/:id",verifyToken, addSection);
router.get("/:id/notifications",verifyToken,getNotification); // use pagination  page = 1, limit = 10, isRead, type 

//delete
router.delete("/:id", verifyToken,deleteUser); //deleting profile

//post
router.post("/:id/experience",verifyToken, addExperience);
router.post("/:id/education",verifyToken, addEducation);
router.post("/:id/skill", verifyToken,addSkills);
router.post("/:id/section", verifyToken,addSection);
router.post("/:id/notification", verifyToken,addNotificationToUser); //provide type and message => req.body =>:{type: req.body.type,message: req.body.message,}
//types of notification => "connectionRequest", "message", "like", "comment", "jobAlert"

//put
router.post(
  "/:id",
  upload.fields([{ name: "profilePicture" }, { name: "bannerImg" }]),
  UpdateProfile
); //updating profile

module.exports = router;
