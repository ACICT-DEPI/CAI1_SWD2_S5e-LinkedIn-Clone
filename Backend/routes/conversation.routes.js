const express = require("express");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const { getConversations ,getChatUsers } = require("../controllers/conv.controller");


const router = express.Router();

router.get("/", verifyTokenAndUserCheck, getConversations);
router.get("/chat-users", verifyTokenAndUserCheck, getChatUsers);


module.exports = router;