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
const { verifyAndProtect } = require("../middleware/verifyAndProtect.js");
const router = express.Router();

//get
router.get("/",verifyAndProtect, getAllUsers);
router.get("/suggestions",verifyAndProtect, getSuggstedConnections);
router.get("/connections",verifyAndProtect, getUserConnections);
router.get("/posts",verifyAndProtect, getUserPosts);
router.get("/comments", verifyAndProtect,getUserComments);
router.get("/:id",verifyAndProtect, getPublicProfile); //example api call: http://localhost:5000/api/users/haneen
router.get("/:id",verifyAndProtect, addSection);
router.get("/:id/notifications",verifyAndProtect,getNotification); // use pagination  page = 1, limit = 10, isRead, type 
//delete
router.delete("/:id", verifyAndProtect,deleteUser); //deleting profile

//post
router.post("/:id/experience",verifyAndProtect, addExperience);
router.post("/:id/education",verifyAndProtect, addEducation);
router.post("/:id/skill", verifyAndProtect,addSkills);
router.post("/:id/section", verifyAndProtect,addSection);
router.post("/:id/notification", verifyAndProtect,addNotificationToUser); //provide type and message => req.body =>:{type: req.body.type,message: req.body.message,}
//types of notification => "connectionRequest", "message", "like", "comment", "jobAlert"

//put
router.post(
  "/:id",
  upload.fields([{ name: "profilePicture" }, { name: "bannerImg" }]),
  UpdateProfile
); //updating profile

module.exports = router;
