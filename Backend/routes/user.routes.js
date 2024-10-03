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
} = require("../controllers/user.controller.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const router = express.Router();

//get
router.get("/", getAllUsers);
router.get("/suggestions", getSuggstedConnections);
router.get("/posts", getUserPosts);
router.get("/comments", getUserComments);
router.get("/:id", getPublicProfile); //example api call: http://localhost:5000/api/users/haneen
router.get("/:id", addSection);
router.get("/:id/notifications", getNotification); // use pagination  page = 1, limit = 10, isRead, type 
//delete
router.delete("/:id", deleteUser); //deleting profile

//post
router.post("/:id/experience", addExperience);
router.post("/:id/education", addEducation);
router.post("/:id/skill", addSkills);
router.post("/:id/section", addSection);
router.post("/:id/notification", addNotificationToUser); //provide type and message => req.body =>:{type: req.body.type,message: req.body.message,}
//types of notification => "connectionRequest", "message", "like", "comment", "jobAlert"

//put
router.post(
  "/:id",
  upload.fields([{ name: "profilePicture" }, { name: "bannerImg" }]),
  UpdateProfile
); //updating profile

module.exports = router;
