const {
  webhook,
  whatsAPPIncomingMessage,
  BotMap,
  checkstatus,
  whatsappOutgoingMessage,
} = require("../controllers/message");
var express = require("express"),
  router = express.Router();
router.get("/webhook", webhook);
router.post("/webhook", whatsAPPIncomingMessage);
router.post("/response", whatsappOutgoingMessage);
router.post("/map", BotMap);
router.get("/status", checkstatus);
module.exports = router;
