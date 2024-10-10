const jwt = require("jsonwebtoken");
module.exports.verifyAndProtect = async (req, res, next) => {
	try {
		// Verify the token
		const token = req.cookies.token;
		console.log();
		
		if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		req.userId = decoded.userId;

		// Check if the user exists
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		req.user = user; // Attach the user to the request
		next();
	} catch (error) {
		console.log("Error in verifyAndProtect", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

// module.exports.verifyToken = (req, res, next) => {
// 	const token = req.cookies.token;
// 	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

// 		req.userId = decoded.userId;
// 		next();
    
// 	} catch (error) {
// 		console.log("Error in verifyToken ", error);
// 		return res.status(500).json({ success: false, message: "Server error" });
// 	}
// };