const express = require("express");
const {
  getAllNotification,
  getNotificationById,
  changeNotificationStatus,
//   changeConnectionStatus,
} = require("../controllers/notification.controller.js");
const { verifyAndProtect } = require("../middleware/verifyAndProtect.js");
// const { verifyToken} = require("../middleware/verifyToken.js");
// const {protectRoute} = require("../controllers/auth.controller.js");

const router = express.Router();
router.get("/",verifyAndProtect, getAllNotification);
router.get("/:id", verifyAndProtect,getNotificationById);
router.patch("/:id", verifyAndProtect,changeNotificationStatus);
// router.get("/:id", changeConnectionStatus);
module.exports = router;
