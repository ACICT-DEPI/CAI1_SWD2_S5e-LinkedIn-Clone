const express = require("express");
const connectionController = require("../controllers/connections.controllers");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndUserCheck, connectionController.sendConnection)
  .get(verifyTokenAndUserCheck, connectionController.getAllConnections);
router
  .route("/pending")
  .get(verifyTokenAndUserCheck, connectionController.showAllPendingConnections);
router
  .route("/status")
  .post(verifyTokenAndUserCheck, connectionController.changeConnectionStatus);
module.exports = router;
