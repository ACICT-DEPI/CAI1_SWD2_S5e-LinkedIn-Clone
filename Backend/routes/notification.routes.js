const express = require("express");
const {
    getAllNotification,
  getNotificationById,
} = require("../controllers/notification.controller.js");
const router = express.Router();
router.get("/", getAllNotification);
router.get("/:id", getNotificationById);
module.exports = router;
