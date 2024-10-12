const express = require("express");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const { getConversations } = require("../controllers/conv.controller");


const router = express.Router();

router.get("/", verifyTokenAndUserCheck, getConversations);


module.exports = router;