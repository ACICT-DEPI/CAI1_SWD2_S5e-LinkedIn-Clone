const express = require("express");
const { verifyAndProtect } = require("../middleware/verifyAndProtect");
const { sendMessage , getMessages} = require("../controllers/message.controller");

const router = express.Router();

          //user_id i want their chat  //load Messages btwn 2 users
router.get("/:id", verifyAndProtect, getMessages);
            //receiver_Id
router.post("/send/:id", verifyAndProtect, sendMessage);

module.exports = router;