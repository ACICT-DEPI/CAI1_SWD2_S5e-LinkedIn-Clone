const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Connections = mongoose.model("Connections", connectionSchema);

module.exports = Connections;
