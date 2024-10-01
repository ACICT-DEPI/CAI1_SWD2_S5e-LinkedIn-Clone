const Posts = require("../models/post.model.js");
const Tag = require("../models/tag.model.js");
const { User } = require("../models/user.model.js");
const Comments = require("../models/comments.model.js");

// helper functions
const findPost = async (postId) => {
  const post = await Posts.findById(postId, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(404).json({
        message: "Post not found!",
      });
    } else return docs;
  });
  return post;
};
const findUser = async (userId) => {
  const user = await Posts.findById(userId, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(404).json({
        message: "Not exist user not found!",
      });
    } else return docs;
  });
};

const findComment = async (commentId) => {
  // Find the comment in the Comment schema, ensuring it belongs to the user and post
  const existingComment = await Comment.findById(commentId);

  if (!existingComment) {
    return res.status(404).json({ error: "Comment not found or unauthorized" });
  }
  return existingComment;
};

// controllers
const addComment = async (req, res) => {
  // todo add comment id in users db
  try {
    const { imgs, videos, comment, userId, postId } = req.body;

    // Find the post and user
    const post = await findPost(postId);
    const user = await findUser(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or user not found" });
    }

    // Create a new comment
    let newComment = new Posts({
      postId: post._id,
      userId: user._id,
      content: comment,
      media: {
        images: imgs || [],
        videos: videos || [],
      },
    });

    // Save the comment
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    // Respond with the new comment
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

const editComment = async (req, res) => {
  try {
    const { imgs, videos, comment, userId, postId, commentId } = req.body;

    // Find the post and user (ensure these functions return the post and user)
    const post = await findPost(postId);
    const user = await findUser(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or user not found" });
    }

    const existingComment = await findComment(commentId);

    // Update the comment's content and media (images, videos)
    existingComment.content = comment;

    if (imgs && videos) {
      existingComment.media.images = imgs;
      existingComment.media.videos = videos;
    } else if (imgs) {
      existingComment.media.images = imgs;
      existingComment.media.videos = [];
    } else if (videos) {
      existingComment.media.images = [];
      existingComment.media.videos = videos;
    } else {
      existingComment.media = {
        images: [],
        videos: [],
      };
    }

    // Save the updated comment
    await existingComment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment: existingComment,
    });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ error: "Failed to edit comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId, userId, postId } = req.body;

    // Validate user and post (assuming these functions throw an error if not found)
    const user = await findUser(userId);
    const post = await findPost(postId);
    // Find and delete the comment by its ID
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      userId: userId,
      postId: postId,
    });

    if (!deletedComment) {
      return res
        .status(404)
        .json({ error: "Comment not found or unauthorized" });
    }
    //todo delete comment from users db
    post.comments = post.comments.filter((comment) => comment !== commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

const addLike = async (req, res) => {
  try {
    const { commentId, userId, postId } = req.body;
    await findUser(userId);
    await findPost(postId);
    // Add the userId to the likes array if it's not already present
    await Comment.findByIdAndUpdate(
      commentId,
      { $addToSet: { likes: userId } }, // $addToSet adds userId only if it's not already in the array
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Failed to add like" });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { commentId, userId, postId } = req.body;

    // Validate user and post (assuming these functions throw an error if not found)
    await findUser(userId);
    await findPost(postId);

    // Remove the userId from the likes array in the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { likes: userId } }, // $pull removes the userId from the likes array
      { new: true } // Return the updated document after the change
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res
      .status(200)
      .json({ message: "Like removed successfully", updatedComment });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ error: "Failed to remove like" });
  }
};

const addReply = async (req, res) => {
  try {
    const { commentId, userId, postId, content, imgs, videos } = req.body;

    // Find the parent comment to which we are adding a reply
    const parentComment = await findComment(commentId);

    // Create a new reply as a comment
    const newReply = new Comment({
      userId: userId,
      postId: postId,
      content,
      media: {
        images: imgs || [],
        videos: videos || [],
      },
      parentComment: commentId,
    });

    // Save the new reply
    await newReply.save();

    // Add the reply's ID to the replies array of the parent comment
    parentComment.replies.push(newReply._id);
    await parentComment.save();

    res.status(201).json({
      message: "Reply added successfully",
      reply: newReply,
    });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ error: "Failed to add reply" });
  }
};

// display controllers

const getAllComments = async (req, res) => {
  try {
    // Fetch all comments from the database
    const comments = await Comment.find().populate("userId", "username", "profile"); // Populate userId with username (optional)

    // Check if comments exist
    if (!comments.length) {
      return res.status(404).json({ message: "No comments found" });
    }

    // Return the list of comments
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};

// Export the functions using CommonJS
module.exports = {
  addComment,
  editComment,
  deleteComment,
  addLike,
  deleteLike,
  addReply,
};
