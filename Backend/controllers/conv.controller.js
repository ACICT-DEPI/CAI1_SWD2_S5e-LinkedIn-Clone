const { Conversation } = require("../models/conversation.model");
const { User } = require("../models/user.model"); // Assuming User model exists
const { io } = require("../socket/socket");

const getConversations = async (req, res) => {
  try {
    const userId = req.userId;

    // Find conversations where the user is a participant and there are messages
    const conversations = await Conversation.find({
      participants: userId,
      messages: { $exists: true, $not: { $size: 0 } },
    })
      .populate("participants", "username userProfile") // Load username and profile picture
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } },
      })
      .exec();

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error in getConversations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getChatUsers = async (req, res) => {
  try {
    const userId = req.userId; // Get current user's ID from token

    // Find conversations where the user is a participant and there are messages
    const conversations = await Conversation.find({
      participants: userId,
      messages: { $exists: true, $ne: [] },
    })
      .populate("participants", "username email profilePicture")
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } }, // Sort messages by latest created date
        perDocumentLimit: 1, // Only fetch the latest message
      })
      .sort({ "messages.createdAt": -1 }) // Sort conversations by the latest message time
      .exec();

    // Extract unique users (excluding the current user)
    const chatUsers = conversations.flatMap((conv) =>
      conv.participants.filter((user) => user._id.toString() !== userId)
    );

    res.status(200).json(chatUsers);
  } catch (error) {
    console.error("Error in getChatUsers:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getConversations ,
  getChatUsers
};


