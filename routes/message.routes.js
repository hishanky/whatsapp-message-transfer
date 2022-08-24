const { whatsappMessage, BotMap } = require("../controllers/message");
var express = require("express"),
  router = express.Router();
console.log("in employee routes");
router.post("/", whatsappMessage);
router.post("/map", BotMap);
module.exports = router;
