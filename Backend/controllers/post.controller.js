const Posts = require("../models/post.model.js");
const Tag = require("../models/tag.model.js");
const { User } = require("../models/user.model.js");
const { Notification } = require("../models/notification.model.js");
const Connections = require("../models/connection.model.js");
const findMyAcceptedConnectionsIds = async (user) => {
  try {
    let acceptedUsers = [];
    const acceptedConnections = await Promise.all(
      user.connections.map(async (connectionId) => {
        const connection = await Connections.findById(connectionId);
        // console.log(connection);

        if (!connection || connection.status !== "accepted") {
          return null;
        }
        // console.log(connectionId);
        const friendId =
          String(connection.senderId) !== String(user._id)
            ? connection.senderId
            : connection.receiverId;
        console.log("sender", connection.senderId);
        console.log("receiver", connection.receiverId);
        console.log("user", user._id);

        acceptedUsers.push(friendId);
      })
    );

    return acceptedUsers;
  } catch (error) {
    console.error("Error fetching accepted connections:", error);
    return [];
  }
};

const getFeedPosts = async (req, res) => {
  try {
    let posts;
    let tagIds = [];
    const user = req.user;
    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    // Find matching tags for the user's title (interest) using regex
    if (user.headline) {
      const userTitleRegex = new RegExp(
        user.headline.split(" ").join("|"),
        "i" // Case-insensitive matching
      );
      const matchingTags = await Tag.find({ name: { $regex: userTitleRegex } });
      tagIds = matchingTags.map((tag) => tag._id);
    }

    // Get pagination parameters from query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || null; // Default to null (all posts) if not provided
    const skip = limit ? (page - 1) * limit : 0; // Calculate the number of posts to skip only if limit is provided

    // Case 1: If the user has no connections, fetch posts based on their interests (tags)
    if (!user.connections || user.connections.length === 0) {
      posts = await Posts.find({
        $or: [{ auther: { $in: user._id } }, { tags: { $in: tagIds } }],
      })
        .populate("auther", "name username profilePicture headline")
        .populate("comments.user", "name profilePicture")
        .sort({ createdAt: -1 }) // Sort by time (most recent first)
        .skip(skip) // Skip the calculated number of posts
        .limit(limit); // Limit the number of posts returned, or null for all
    }
    // Case 2: If the user has connections, fetch posts from both connections and by their interests
    else {
      const userConnections = await findMyAcceptedConnectionsIds(user);
      console.log(userConnections);

      posts = await Posts.find({
        $or: [
          { auther: { $in: [...userConnections, user._id] } },
          { tags: { $in: tagIds } },
        ],
      })
        .populate("auther", "name firstName lastName profilePicture headline")
        .populate("comments.user", "name profilePicture")
        .sort({ createdAt: -1 }) // First sort by time
        .skip(skip) // Skip the calculated number of posts
        .limit(limit); // Limit the number of posts returned, or null for all
    }

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        message: "No posts found!",
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in get all feed posts controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createPost = async (req, res) => {
  try {
    const { content, imgs, videos } = req.body;
    let newPost;
    const user = req.user;
    console.log(user);

    if (imgs && videos) {
      newPost = new Posts({
        // auther: req.user._id, // Fix typo (use -> req.user)
        auther: user._id,
        content,
        media: {
          images: imgs, // Fix typo: images -> imgs
          videos: videos,
        },
      });
    } else if (imgs) {
      newPost = new Posts({
        auther: req.user._id, // Fix typo (use -> req.user)
        content,
        media: {
          images: imgs, // Fix typo: imags -> imgs
          videos: [],
        },
      });
    } else if (videos) {
      newPost = new Posts({
        auther: req.user._id, // Fix typo (use -> req.user)
        content,
        media: {
          images: [],
          videos: videos,
        },
      });
    } else {
      newPost = new Posts({
        // auther: req.user._id, // Fix typo (use -> req.user)
        auther: user._id,
        content,
      });
    }
    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    // Notify all connections about the new post
    const notificationMessage = `${user.username} created a new post`;

    const notifications = user.connectedUsers.map(async (connectionId) => {
      const notification = new Notification({
        type: "post",
        message: notificationMessage,
        relatedId: newPost._id,
        isRead: false,
      });

      const savedNotification = await notification.save();

      // Find the connected user and add the notification
      const connectedUser = await User.findById(connectionId);
      if (connectedUser) {
        connectedUser.notifications.push(savedNotification._id);
        await connectedUser.save();
      }
    });

    // Wait for all notifications to be processed
    await Promise.all(notifications);

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId)
      .populate("auther", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    const user = req.user;
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.auther.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Posts.findByIdAndDelete(postId);

    user.posts = user.posts.filter((post) => post != postId);
    await user.save();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in delete post controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to 1 and null if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit); // Default to undefined if not provided

    // Calculate the number of posts to skip based on the current page
    const skip = limit ? (page - 1) * limit : 0; // Only calculate skip if limit is defined

    // Fetch posts with pagination, populating the required fields (e.g., 'auther', 'comments')
    const posts = await Posts.find()
      .populate("auther", "username") // Populate the author field with username
      .populate("tags") // Populate tags if needed
      .skip(skip) // Skip the previous pages' posts
      .limit(limit) // Limit the number of posts to be returned, or null for all
      .sort({ createdAt: -1 }); // Sort posts by creation date (newest first)

    // Get total number of posts for calculating total pages
    const totalPosts = await Posts.countDocuments();

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalPosts / limit) : 1, // Total pages calculated only if limit is defined
      totalPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
};


const getAllComments = async (req, res) => {
  try {
    const postId = req.params.id;

    // Get page and limit from query parameters, default to 1 and null if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit); // Default to undefined if not provided

    // Calculate the number of comments to skip based on the current page
    const skip = limit ? (page - 1) * limit : 0; // Only calculate skip if limit is defined

    // Find the post and populate comments with user details
    const post = await Posts.findById(postId)
      .populate({
        path: "comments",
        options: {
          skip, // Skip the previous pages' comments
          limit, // Limit the number of comments returned, or null for all
        },
        populate: {
          path: "userId",
          select: "firstName lastName headline profilePicture",
        },
        select: "-postId -__v",
      })
      .select("comments");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Get total number of comments for calculating total pages
    const totalComments = await Posts.findById(postId)
      .select("comments")
      .populate("comments")
      .then((p) => p.comments.length);

    res.status(200).json({
      comments: post.comments,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalComments / limit) : 1, // Total pages calculated only if limit is defined
      totalComments,
    });
  } catch (error) {
    console.error("Error in getPostById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const sharePost = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const post = await Posts.findByIdAndUpdate(
      req.body.postId,
      { $addToSet: { share: user._id } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //send notification to auther
    const notification = new Notification({
      type: "post",
      message: `${user.username} reposted your post`,
      relatedId: post._id,
      isRead: false,
    });
    console.log(notification);
    const savedNotification = await notification.save();
    const author = await User.findById(post.auther); 
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    if (!author.notifications) {
      author.notifications = [];
    }
    author.notifications.push(savedNotification._id);

    // Save the author's notifications
    await author.save();

    return res.status(200).json({
      message: "Post shared successfully",
      post,
    });
  } catch (error) {
    console.log("Error sharePost", error);
    return res.status(500).json({ message: "Error in share a post" });
  }
};

// Export the functions using CommonJS
module.exports = {
  getFeedPosts,
  createPost,
  getPostById,
  deletePost,
  getAllPosts,
  getAllComments,
  sharePost,
};
