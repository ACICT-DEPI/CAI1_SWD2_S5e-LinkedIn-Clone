const { User } = require("../models/user.model.js");

 const getSuggstedConnections = async (req, res) => {
  try {
    //dont recommend my rofile nor the users i have
    const curentUser = await User.findById(req.user._id).select("connections");
    const suggestedUser = await User.find({
      _id: { $ne: req.user._id, $nin: curentUser.connections },
    })
      .select("name username profilePicture headline")
      .limit(3);
    res.json(suggestedUser);
    //profile, name , header, path to their profile
  } catch (error) {
    console.log("error in  getSuggstedConnections:", error);
    res.status(500).json({ message: "server error" });
  }
};
 const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ usrname: req.params.usrname }).select(
      "-password"
    );
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
    //todo: profile and banner img
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password"); // the new returns the pbject after the update is done
    res.json(user);
  } catch (error) {
    console.log("error in  Up dateProfile:", error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getSuggstedConnections,
  getPublicProfile,
  UpdateProfile,
};