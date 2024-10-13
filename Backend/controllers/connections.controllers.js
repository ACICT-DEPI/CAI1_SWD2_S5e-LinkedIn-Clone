const { User } = require("../models/user.model.js");
const { Notification } = require("../models/notification.model.js");
const Connections = require("../models/connection.model");
const sendConnection = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user._id;
    // Validate request body
    if (!senderId || !receiverId) {
      return res.status(400).json({
        message: "Bad request - senderId and receiverId are required!",
      });
    }

    // Check if a connection already exists
    const existingConnection = await Connections.findOne({
      senderId,
      receiverId,
    });

    if (existingConnection) {
      return res.status(400).json({
        message:
          "Connection request already sent or users are already connected!",
      });
    }

    // Create new connection
    const newConnection = new Connections({
      senderId,
      receiverId,
      status: "pending", // default status for a new connection request
    });

    // Update sender's connections
    const sender = await User.findByIdAndUpdate(
      senderId,
      { $push: { connections: newConnection._id } },
      { new: true }
    );

    if (!sender) {
      return res.status(404).json({
        message: "Sender not found!",
      });
    }

    // Update receiver's connections
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

    // Save the new connection
    await newConnection.save();

    // Send notification to the receiver
    const notificationMessage = `${sender.username} has sent you a connection request`;

    const notification = new Notification({
      type: "connectionRequest", // Notification type for connection requests
      message: notificationMessage,
      relatedId: newConnection._id, // Store the connection request ID as the relatedId
      isRead: false,
    });

    // Save the notification
    const savedNotification = await notification.save();

    // Push notification to the receiver's notifications array
    receiver.notifications.push(savedNotification._id);
    await receiver.save();

    res.status(201).json({
      message: `Connection request successfully sent from ${sender.username} to ${receiver.username}`,
      connection: newConnection,
    });
  } catch (error) {
    console.error("Error sending connection:", error);
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
      // Add the sender to the receiver's connectedUsers array and vice versa
      await User.findByIdAndUpdate(senderId, {
        $addToSet: { connectedUsers: receiverId }, 
      });

      await User.findByIdAndUpdate(receiverId, {
        $addToSet: { connectedUsers: senderId }, 
      });
      // Send notification to the sender that the connection was accepted
      const receiver = await User.findById(receiverId);
      const notificationMessage = `${receiver.username} has accepted your connection request`;

      const notification = new Notification({
        type: "connectionRequest",
        message: notificationMessage,
        relatedId: connectionId, // Store the connection ID in the notification
        isRead: false,
      });

      const savedNotification = await notification.save();

      // Add the notification to the sender's notifications array
      await User.findByIdAndUpdate(senderId, {
        $push: { notifications: savedNotification._id },
      });
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
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 100; // Default limit; adjust as needed

    // Fetch all connections from the database with pagination
    const connections = await Connections.find()
      .populate("senderId", "username")
      .populate("receiverId", "username")
      .skip((page - 1) * limit) // Skip the documents for the current page
      .limit(limit); // Limit the number of results

    // Check if any connections exist
    if (!connections.length) {
      return res.status(404).json({ message: "No connections found" });
    }

    // Count total connections for pagination
    const totalConnections = await Connections.countDocuments();

    // Prepare the response object
    const response = {
      totalConnections,
      currentPage: page,
      totalPages: Math.ceil(totalConnections / limit),
      connections,
    };

    // Return the list of connections
    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving connections:", error);
    res.status(500).json({ error: "Failed to retrieve connections" });
  }
};

module.exports = {
  sendConnection,
  showAllPendingConnections,
  changeConnectionStatus,
  getAllConnections,
};
