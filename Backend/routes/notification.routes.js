const express = require("express");
const {
  getAllNotification,
  getNotificationById,
  changeNotificationStatus,
//   changeConnectionStatus,
} = require("../controllers/notification.controller.js");
const router = express.Router();
router.get("/", getAllNotification);
router.get("/:id", getNotificationById);
router.patch("/:id", changeNotificationStatus);
// router.get("/:id", changeConnectionStatus);
module.exports = router;
