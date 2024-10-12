const express = require("express");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const { sendMessage , getMessages} = require("../controllers/message.controller");

const router = express.Router();

          //user_id i want their chat  //load Messages btwn 2 users
router.get("/:id", verifyTokenAndUserCheck, getMessages);
            //receiver_Id
router.post("/send/:id", verifyTokenAndUserCheck, sendMessage);

module.exports = router;