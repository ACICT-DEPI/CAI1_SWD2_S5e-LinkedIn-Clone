const { Notification } = require("../models/notification.model.js");
const getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.find();

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || notifications.length; // Default to send all notifications

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Paginate the notifications
    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    // Prepare the response object
    const response = {
      totalNotifications: notifications.length,
      currentPage: page,
      totalPages: Math.ceil(notifications.length / limit),
      notifications: paginatedNotifications,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error in getAllNotifications:", error);
    res.status(500).json({ message: error.message });
  }
};
const getNotificationById = async (req, res) => {
  try {
    console.log(req.params.id);

    const notification = await Notification.findById(req.params.id);
    console.log(notification);

    if (!notification) {
      return res.status(404).json({ message: "notification not found" });
    }
    res.json(notification);
  } catch (error) {
    console.log("error in  getPublicProfile:", error);
    res.status(500).json({ message: "server error" });
  }
};
const changeNotificationStatus = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "notification not found" });
    }
    notification.isRead = true;
    res.json(notification);
  } catch (error) {
    console.log("error in  getPublicProfile:", error);
    res.status(500).json({ message: "server error" });
  }
};
module.exports = {
  getNotificationById,
  getAllNotification,
  changeNotificationStatus,
};
