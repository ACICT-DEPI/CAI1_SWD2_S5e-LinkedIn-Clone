const { User } = require("../models/user.model.js");
const { Notification } = require("../models/notification.model.js");
const cloudinary = require("../db/cloudinary.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const getSuggstedConnections = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to 1 and 3 if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 3; // Default to limit 3 if not provided

    // Calculate the number of users to skip based on the current page
    const skip = (page - 1) * limit;

    // Select the current user's connections
    const currentUser = await User.findById(req.user._id).select("connections");

    // Find suggested users excluding the current user and their connections
    const suggestedUsers = await User.find({
      _id: { $ne: req.user._id, $nin: currentUser.connections },
    })
      .select("name username profilePicture headline")
      .skip(skip) // Skip the previous pages' users
      .limit(limit); // Limit the number of suggested users returned

    // Get total number of suggested users for calculating total pages
    const totalSuggestedUsers = await User.countDocuments({
      _id: { $ne: req.user._id, $nin: currentUser.connections },
    });

    res.status(200).json({
      suggestedUsers,
      currentPage: page,
      totalPages: Math.ceil(totalSuggestedUsers / limit), // Total pages calculated
      totalSuggestedUsers,
    });
  } catch (error) {
    console.log("error in getSuggstedConnections:", error);
    res.status(500).json({ message: "server error" });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    console.log("Received request for id:", req.params.id);
    // edit it because it was not working with findOne
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("error in  getPublicProfile:", error);
    res.status(500).json({ message: "server error" });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    console.log(req.params); // Debugging logs
    console.log(req.files); // Check if files are coming through
    console.log(req.body);

    const allowedField = [
      "firstName",
      "lastName",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
    ];
    const updatedData = {};
    for (const field of allowedField) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    // Handle profile picture upload
    if (req.files && req.files.profilePicture) {
      try {
        const result = await cloudinary.uploader.upload(
          req.files.profilePicture[0].path
        );
        updatedData.profilePicture = result.secure_url;
      } catch (uploadError) {
        console.log("Error uploading profile picture:", uploadError);
        return res
          .status(500)
          .json({ message: "Error uploading profile picture" });
      }
    }

    // Handle banner image upload
    if (req.files && req.files.bannerImg) {
      try {
        const result = await cloudinary.uploader.upload(
          req.files.bannerImg[0].path
        );
        updatedData.bannerImg = result.secure_url;
      } catch (uploadError) {
        console.log("Error uploading banner image:", uploadError);
        return res
          .status(500)
          .json({ message: "Error uploading banner image" });
      }
    }

    // Update the user profile
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    ).select("-password"); // exclude password field
    res.json(user);
  } catch (error) {
    console.log("Error in UpdateProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to 1 and null if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit); // Default to undefined if not provided

    // Calculate the number of users to skip based on the current page
    const skip = limit ? (page - 1) * limit : 0; // Only calculate skip if limit is defined

    // Fetch users with optional pagination
    const users = await User.find()
      .skip(skip) // Skip the previous pages' users, if limit is defined
      .limit(limit) // Limit the number of users to be returned, or undefined for all
      .select("name username profilePicture headline"); // Select desired fields

    // Get total number of users for calculating total pages
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalUsers / limit) : 1, // Total pages calculated only if limit is defined
      totalUsers,
    });
  } catch (error) {
    console.log("error in Up getAllUsers:", error);
    res.status(500).json({ message: error.message });
  }
};


const getUserPosts = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.posts);
  } catch (error) {
    console.log("error in getUserPosts :", error);
    res.status(500).json({ message: "server error" });
  }
};
const getUserComments = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comments = user.comments || [];
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || comments.length; // Default to send all comments

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Paginate the comments
    const paginatedComments = comments.slice(startIndex, endIndex);

    // Prepare the response object
    const response = {
      totalComments: comments.length,
      currentPage: page,
      totalPages: Math.ceil(comments.length / limit),
      comments: paginatedComments,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("error in getUserComments :", error);
    res.status(500).json({ message: "server error" });
  }
};


const addExperience = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.experience.push(req.body);
  await user.save();
  res.status(200).json(user);
};
const addSkills = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.skills.push(req.body);
  await user.save();
  res.status(200).json(user);
};
const addEducation = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.education.push(req.body);
  await user.save();
  res.status(200).json(user);
};

const addSection = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.section.push(req.body);
  await user.save();
  res.status(200).json(user);
};

const getNotification = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, isRead, type } = req.query;

  try {
    const query = { user: userId };

    if (isRead !== undefined) {
      query.isRead = isRead === "true";
    }
    if (type) {
      query.type = type;
    }

    const notifications = await Notification.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    if (!notifications) return res.status(404).send("No notifications found");

    res.status(200).send(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const addNotificationToUser = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Validate if required fields are present
    if (!req.body.type || !req.body.message) {
      return res.status(400).json({ error: "Type and message are required." });
    }

    // Create a new notification
    const notification = new Notification({
      type: req.body.type,
      message: req.body.message,
    });

    // Save the notification
    const savedNotification = await notification.save();
    console.log("Notification saved:", savedNotification);

    // Find the user by ID from req.params
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the saved notification's _id to the user's notifications array
    user.notifications.push(savedNotification._id);

    // Save the updated user with new notifications
    await user.save();
    console.log("User updated with notification:", user);

    // Send the response with the updated user notifications
    res.status(200).json({ success: true, notifications: user.notifications });
  } catch (error) {
    console.error("Error adding notification:", error);
    res.status(500).json({ error: "Error adding notification" });
  }
};

const getUserConnections = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const connectionOfUser = await Promise.all(
      user.connectedUsers.map(async (connectionId) => {
        return await User.findById(connectionId).select(
          "profilePicture firstName lastName headline username"
        );
      })
    );

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || connectionOfUser.length; // Default to send all connections

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Paginate the connections
    const paginatedConnections = connectionOfUser.slice(startIndex, endIndex);

    // Prepare the response object
    const response = {
      totalConnections: connectionOfUser.length,
      currentPage: page,
      totalPages: Math.ceil(connectionOfUser.length / limit),
      connections: paginatedConnections,
    };

    return res.status(200).json({
      message: "Success",
      ...response,
    });
  } catch (error) {
    console.log("Error in getUserConnections", error);
    return res
      .status(500)
      .json({ message: "Error in getting user connections" });
  }
};

module.exports = {
  getSuggstedConnections,
  getPublicProfile,
  UpdateProfile,
  getAllUsers,
  getUserPosts,
  deleteUser,
  getUserComments,
  addSection,
  addExperience,
  addSkills,
  addEducation,
  getNotification,
  addNotificationToUser,
  getUserConnections,
};
