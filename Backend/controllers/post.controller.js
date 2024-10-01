const Posts = require("../models/post.model.js");
const Tag = require("../models/tag.model.js");
const { User } = require("../models/user.model.js");

const getFeedPosts = async (req, res) => {
  try {
    let posts;
    let tagIds = [];
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }
    // Find matching tags for the user's title (interest) using regex
    if (user.headline) {
      const userTitleRegex = new RegExp(
        user.headline.split(" ").join("|"), // Fix typo here: use -> user
        "i" // Case-insensitive matching
      );
      const matchingTags = await Tag.find({ name: { $regex: userTitleRegex } });
      tagIds = matchingTags.map((tag) => tag._id);
    }

    // Case 1: If the user has no connections, fetch posts based on their interests (tags)
    if (!user.connections || user.connections.length === 0) {
      // Fix typo here: use -> user
      posts = await Posts.find({
        $or: [
          { auther: { $in: user._id } }, // Posts from connections, fixed typo (use -> user)
          { tags: { $in: tagIds } }, // Posts matching user's interests
        ],
      })
        .populate("auther", "name username profilePicture headline")
        .populate("comments.user", "name profilePicture")
        .sort({ createdAt: -1 }); // Sort by time (most recent first)
    }
    // Case 2: If the user has connections, fetch posts from both connections and by their interests
    else {
      posts = await Posts.find({
        $or: [
          { auther: { $in: [...user.connections, user._id] } }, // Posts from connections, fixed typo (use -> user)
          { tags: { $in: tagIds } }, // Posts matching user's interests
        ],
      })
        .populate("auther", "name username profilePicture headline")
        .populate("comments.user", "name profilePicture")
        .sort({ createdAt: -1 }); // First sort by time
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
    const user = await User.findOne({ username: req.body.username });
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
    const userId = req.body.userId;
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    const user = await User.findById(userId);
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

// Export the functions using CommonJS
module.exports = {
  getFeedPosts,
  createPost,
  getPostById,
  deletePost,
};
