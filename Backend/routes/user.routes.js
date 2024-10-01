const express = require("express");
const {
  getSuggstedConnections,
  getPublicProfile,
  UpdateProfile,
} = require("../controllers/user.controller.js");
const { protectRoute } = require("../controllers/auth.controller.js");
const router = express.Router();

//get
router.get("/suggestions", protectRoute, getSuggstedConnections);
router.get("/:username", getPublicProfile);

//put
router.put("/profile", protectRoute, UpdateProfile);

module.exports = router;
