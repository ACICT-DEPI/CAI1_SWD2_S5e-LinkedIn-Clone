const express = require("express");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const { sendMessage , getMessages, deleteMessage, editMessage} = require("../controllers/message.controller");

const router = express.Router();

          //user_id i want their chat  //load Messages btwn 2 users
router.get("/:id", verifyTokenAndUserCheck, getMessages);
            //receiver_Id
router.post("/send/:id", verifyTokenAndUserCheck, sendMessage);

router.put("/edit/:messageId", verifyTokenAndUserCheck, editMessage); 
router.delete("/delete/:messageId", verifyTokenAndUserCheck, deleteMessage);
module.exports = router;