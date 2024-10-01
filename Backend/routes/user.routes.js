const express = require("express");
const {
  getSuggstedConnections,
  getPublicProfile,
  UpdateProfile,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const router = express.Router();

//get
router.get("/", protectRoute, getAllUsers); //ok
router.get("/suggestions", protectRoute, getSuggstedConnections); //ok
router.get("/:username", protectRoute, getPublicProfile); //ok //example api call: http://localhost:5000/api/users/haneen
// router.get("/:id", getUserById);

//put
router.put("/profile", UpdateProfile); //ok

module.exports = router;
