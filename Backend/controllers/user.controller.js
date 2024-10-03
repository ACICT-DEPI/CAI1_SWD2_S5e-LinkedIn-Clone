const { User } = require("../models/user.model.js");
const cloudinary = require("../db/cloudinary.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const getSuggstedConnections = async (req, res) => {
  try {
    //select the profile, name , header, path to their profile
    //dont recommend my profile($ne) nor the users i have ($nin)
    const curentUser = await User.findById(req.user._id).select("connections");
    const suggestedUser = await User.find({
      _id: { $ne: req.user._id, $nin: curentUser.connections },
    })
      .select("name username profilePicture headline")
      .limit(3);
    res.json(suggestedUser);
  } catch (error) {
    console.log("error in  getSuggstedConnections:", error);
    res.status(500).json({ message: "server error" });
  }
};
const getPublicProfile = async (req, res) => {
  try {
    console.log("Received request for id:", req.params.id);
    const user = await User.findOne({ id: req.params.id }).select("-password");
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
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("error in  Up getAllUsers:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
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
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.comments);
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

const addSection= async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.section.push(req.body);
  await user.save();
  res.status(200).json(user);
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
};
