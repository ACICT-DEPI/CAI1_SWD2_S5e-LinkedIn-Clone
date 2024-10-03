const { Notification } = require("../models/notification.model.js");
const getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.log("error in  Up getAllNotifications:", error);
    res.status(500).json({ message: error.message });
  }
};
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "notification not found" });
    }
    res.json(notification);
  } catch (error) {
    console.log("error in  getPublicProfile:", error);
    res.status(500).json({ message: "server error" });
  }
};
module.exports = {
  getNotificationById,
  getAllNotification,
};
