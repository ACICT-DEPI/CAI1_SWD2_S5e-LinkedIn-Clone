const express = require("express");
const {
  protectRoute,
  getPublicProfile,
  UpdateProfile,
} = require("../controllers/auth.controller");
const router = express.Router();

//get
router.get("/suggestions", protectRoute, getSuggstedConnections);
router.get("/:username", protectRoute, getPublicProfile);

//put
router.put("/profile", protectRoute, UpdateProfile);

module.exports = router;
