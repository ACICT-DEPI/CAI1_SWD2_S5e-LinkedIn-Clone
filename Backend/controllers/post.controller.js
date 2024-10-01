import Posts from "../models/post.model.js";

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Posts.find({
      auther: { $in: [...req.user.connections, req.user.id] },
    })
    .populate("auther", "name username profilePicture headline")
    .populate("comments.user", "name profilePicture")
    .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in get all feed posts controller!");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, imgs, videos } = req.body;
    let newPost;
    if (imgs && videos) {
      // ask team how will we upload data (to the server host | cloudinary)
      newPost = new Posts({
        auther: req.user.id,
        content,
        media: {
          images: imags,
          videos: videos,
        },
      });
    }
    if (imgs) {
      // ask team how will we upload data (to the server host | cloudinary)
      newPost = new Posts({
        auther: req.user.id,
        content,
        media: {
          images: imags,
          videos: [],
        },
      });
    } else if (videos) {
      // ask team how will we upload data (to the server host | cloudinary)
      newPost = new Posts({
        auther: req.user.id,
        content,
        media: {
          images: [],
          videos: videos,
        },
      });
    } else {
      newPost = new Posts({
        auther: req.user.id,
        content,
      });
    }
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId)
      .populate("auther", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.auther.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await Posts.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in delete post controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
