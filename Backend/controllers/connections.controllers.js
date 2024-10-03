const { User } = require("../models/user.model.js");
const Connections = require("../models/connection.model");
const sendConnection = async (req, res) => {
  //todo check if the users are already friends

  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(400).json({
        message: "Bad request - sender id and receiver id is required !",
      });
    }
    const newConnection = new Connections({
        senderId: senderId,
        receiverId: receiverId,
      });
    const sender = await User.findByIdAndUpdate(
      senderId,
      { $push: { connections: newConnection._id } },
      { new: true }
    );
    if (!sender) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const receiver = await User.findByIdAndUpdate(
      receiverId,
      { $push: { connections: newConnection._id } },
      { new: true }
    );
    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found!",
      });
    }

    await newConnection.save();
    await sender.save();
    await receiver.save();

    res.status(201).json({
      message: `Connection has been send successfully from ${sender.username} to ${receiver.username}`,
      connection: newConnection,
    });
  } catch (error) {
    console.error("Error sending connection :", error);
    res.status(500).json({ error: "Failed to send connection" });
  }
};
const showAllPendingConnections = async (req, res) => {
  try {
    // Find all connections with a status of 'pending'
    const pendingConnections = await Connections.find({ status: "pending" })
      .populate("senderId", "username")
      .populate("receiverId", "username");

    // Send the list of pending connections as a response
    res.status(200).json({
      success: true,
      count: pendingConnections.length,
      data: pendingConnections,
    });
  } catch (error) {
    // Handle any errors that occur during the query
    res.status(500).json({
      success: false,
      message: "Server Error: Could not retrieve pending connections",
      error: error.message,
    });
  }
};
const changeConnectionStatus = async (req, res) => {
  try {
    const { connectionId, newStatus } = req.body;

    // Check if the newStatus is valid
    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Valid statuses are: accepted, rejected.",
      });
    }

    // Find the connection by ID
    const connection = await Connections.findById(connectionId);

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "Connection not found",
      });
    }

    const { senderId, receiverId } = connection;

    if (newStatus === "rejected") {
      // If rejected, delete the connection from the database
      await Connections.findByIdAndDelete(connectionId);

      // Remove the connection from the sender's and receiver's connections arrays
      await User.findByIdAndUpdate(senderId, {
        $pull: { connections: connectionId },
      });

      await User.findByIdAndUpdate(receiverId, {
        $pull: { connections: connectionId },
      });

      return res.status(200).json({
        status: "success",
        message: "Connection rejected and removed successfully",
      });
    } else {
      // For other statuses (accepted or pending), update the connection status
      const updatedConnection = await Connections.findByIdAndUpdate(
        connectionId,
        { status: newStatus },
        { new: true } // Return the updated document
      );
      return res.status(200).json({
        status: "success",
        message: "Connection status updated successfully",
        data: updatedConnection,
      });
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to update connection status",
      error: error.message,
    });
  }
};

// for testing
const getAllConnections = async (req, res) => {
  try {
    // Fetch all comments from the database
    const connections = await Connections.find()
      .populate("senderId", "username")
      .populate("receiverId", "username");

    // Check if comments exist
    if (!connections.length) {
      return res.status(404).json({ message: "No comments found" });
    }

    // Return the list of comments
    res.status(200).json(connections);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};
module.exports = {
  sendConnection,
  showAllPendingConnections,
  changeConnectionStatus,
  getAllConnections,
};
