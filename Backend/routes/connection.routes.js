const express = require("express");
const connectionController = require("../controllers/connections.controllers");
const router = express.Router();

router
  .route("/")
  .post(connectionController.sendConnection)
  .get(connectionController.getAllConnections);
router.route("/pending").get(connectionController.showAllPendingConnections);
router.route("/status").post(connectionController.changeConnectionStatus);
module.exports = router;
