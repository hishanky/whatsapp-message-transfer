const {
  webhook,
  whatsappmessage,
  BotMap,
  checkstatus,
} = require("../controllers/message");
var express = require("express"),
  router = express.Router();
console.log("in employee routes");
router.get("/webhook", webhook);
router.post("/webhook", whatsappmessage);
router.post("/map", BotMap);
router.get("/status", checkstatus);
module.exports = router;
