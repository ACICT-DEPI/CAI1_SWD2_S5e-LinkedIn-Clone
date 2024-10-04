const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "connectionRequest",
      "message",
      "like",
      "comment",
      "jobAlert",
      "post",
    ], // Example types
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type", 
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
