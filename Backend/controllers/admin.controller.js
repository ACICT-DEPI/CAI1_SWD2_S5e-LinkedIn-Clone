const Comments = require("../models/comments.model");
const Connections = require("../models/connection.model");
const Posts = require("../models/post.model");
const { User } = require("../models/user.model");
const renderUsersView = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to page 1 and showing all users if not specified
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0; // If limit is 0, fetch all users

    // Calculate the number of users to skip based on the page
    const skip = (page - 1) * limit;

    // Fetch the users with pagination logic
    const users = await User.find()
      .skip(skip) // Skip the previous pages' users
      .limit(limit); // Limit the number of users fetched

    // Fetch the total number of users for pagination information
    const totalUsers = await User.countDocuments();

    // Render the users view with pagination data
    // res.status(200).json({message:users});
    res.status(200).render("users", {
      users,
      currentPage: page,
      limit: limit,
      totalPages: limit > 0 ? Math.ceil(totalUsers / limit) : 1, // If limit is 0, only 1 page exists
      totalUsers,
    });
  } catch (error) {
    res.status(500).render("error.pug");
  }
};
const renderUserViewById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).render("error.pug", { message: "User not found" });
    }
    res.status(200).render("users/userDetails", { user });
  } catch (error) {
    res.status(500).render("error.pug", { message: "An error occurred" });
  }
};

///users/:userId/posts
const renderAllUserPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 posts per page
  const posts = await Posts.find({ auther: req.params.userId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("comments") // Optionally populate comments
    .exec();
  const count = await Posts.countDocuments({ auther: req.params.userId });
  const user = await User.findById(req.params.userId);
  res.render("users/userPosts", {
    user: user,
    posts,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};
///users/:userId/comments
const renderAllUserComments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const comments = await Comments.find({ userId: req.params.userId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("postId") // Optionally populate post information
    .exec();
  const count = await Comments.countDocuments({
    userId: req.params.userId,
  });
  const user = await User.findById(req.params.userId);
  res.render("users/userComments", {
    user: user,
    comments,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

///users/:userId/connections
const renderAllUserConnections = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const connections = await Connections.find({
    $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("senderId receiverId") // Populate both user details
    .exec();
  const count = await Connections.countDocuments({
    $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
  });
  const user = await User.findById(req.params.userId);
  res.render("users/userConnections", {
    user: user,
    connections,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

//posts
const renderAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await Posts.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("auther comments") // Optionally populate user and comments
    .exec();
  const count = await Posts.countDocuments();
  res.json({
    posts,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

//comments

const renderAllComments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const comments = await Comments.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("userId postId") // Optionally populate user and post info
    .exec();
  const count = await Comments.countDocuments();
  res.json({
    comments,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};
module.exports = {
  renderUsersView,
  renderUserViewById,
  renderAllUserPosts,
  renderAllUserComments,
  renderAllUserConnections,
  renderAllPosts,
  renderAllComments,
};
