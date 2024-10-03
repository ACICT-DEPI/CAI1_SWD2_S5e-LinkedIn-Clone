const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["connectionRequest", "message", "like", "comment", "jobAlert"], // Example types
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = {
  Notification,
};