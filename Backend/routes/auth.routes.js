const express = require("express");
const {
  signup,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  protectRoute,
} = require("../controllers/auth.controller.js");
const { verifyAndProtect } = require("../middleware/verifyAndProtect.js");

const router = express.Router();

router.get("/check-auth", verifyAndProtect); 

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

module.exports = router;
