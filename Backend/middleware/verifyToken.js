const jwt = require("jsonwebtoken");
const {User} =require("../models/user.model");

module.exports.verifyTokenAndUserCheck = async(req, res, next) => {
	const token = req.cookies.token;
  
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

    req.userId = decoded.userId;
		req.isAdmin = decoded.isAdmin;

    // Check if the user exists
		const user = await User.findById(req.userId)
      .select("-password")
      .populate({path:"connectedUsers",select:"firstName lastName userName profilePicture headline"});
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		req.user = user; // Attach the user to the request
    
		next();
    
	} catch (error) {
		
		return res.status(500).json({ success: false, message: "Server error" });
	}
};


// Verify Token & Check if is Admin
module.exports.verifyAndAdminCheck  = (req, res, next) => {
    verifyTokenAndUserCheck(req, res, () => {
    if (req.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden - Admin access required" });
    }
  });
}



// Verify Token & Check if the user exists
// module.exports.verifyAndUserCheck = async (req, res, next) => {
//   try {
//     await verifyToken(req, res);
//     const user = await User.findById(req.userId).select("-password"); // Await the asynchronous operation

//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

