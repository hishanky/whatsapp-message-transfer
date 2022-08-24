const utils = require("../utils/utils");
const request = require("request");
exports.whatsappMessage = async (req, res) => {
  const whatsappMessage = req.body;
  console.log(whatsappMessage);

  const BotData = await utils.internalGet(process.env.BOTNAME);
  console.log(BotData);

  var options = {
    method: "POST",
    url: BotData.Url + "/incomingMessage",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(whatsappMessage),
  };
  console.log(options);
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};

exports.BotMap = async (req, res) => {
  console.log(req.body);
  const urlData = req.body;
  const presentData = (await utils.internalGet(urlData.BotName)) || false;
  if (!presentData) {
    await utils.internalSet(urlData.BotName, urlData);
  } else {
    await utils.internalDel(urlData.BotName);
    await utils.internalSet(urlData.BotName, urlData);
  }

  res.status(200).send({
    message: `Bot mapped to ${urlData.Url} Registered successfully`,
  });
};
