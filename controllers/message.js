const utils = require("../utils/utils");
const request = require("request");
const axios = require("axios");

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

exports.webhook = async (req, res) => {
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challange);
    } else {
      res.status(403);
    }
  }
};

exports.whatsappmessage = async (req, res) => {
  let body_param = req.body;

  if (body_param.object) {
    console.log("inside body param");
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phon_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0];

      console.log("phone number " + phon_no_id);
      console.log("from " + from);
      console.log("boady param " + msg_body);
      const BotData = await utils.internalGet(process.env.BOTNAME);
      var config = {
        method: "post",
        url: BotData.Url + "/incomingMessage",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(msg_body),
      };

      axios(config)
        .then(function (response) {
          console.log(">>>>>>>", JSON.stringify(response.data));

          let recivedData = response.data;
          var senddata = {
            messaging_product: "whatsapp",
            to: from,
            recipient_type: "individual",
            ...recivedData,
          };
          console.log(">>>>>>>>>>>>", senddata);
          var config2 = {
            method: "post",
            url: "https://graph.facebook.com/v13.0/" + phon_no_id + "/messages",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            data: senddata,
          };

          console.log("senddata>>>>>>>>", config2);
          axios(config2)
            .then(function (response) {
              console.log(response.data);
              res.sendStatus(200);
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            });
        })
        .catch(function (error) {
          console.log(error);
        });

      // request(options, async (error, datafromlocal) => {
      //   if (error) throw new Error(error);
      //   let response = await datafromlocal;
      //   if (response.body.message == "ok") {
      //     let recivedData = response.body.data;
      //     console.log(recivedData);
      //     var options2 = {
      //       method: "POST",
      //       url:
      //         "https://graph.facebook.com/v13.0/" +
      //         phon_no_id +
      //         "/messages?access_token=" +
      //         token,
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       data: {
      //         messaging_product: "whatsapp",
      //         to: from,
      //         ...recivedData,
      //       },
      //     };
      //     console.log(options2);

      //     request(options2, function (error, response2) {
      //       if (error) throw new Error(error);
      //       // console.log(">>>>>", response2);

      //       res.sendStatus(200);
      //     });
      //   }
      // });
    } else {
      res.sendStatus(404);
    }
  }
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

exports.checkstatus = async (req, res) => {
  res.status(200).send({ message: "working fine" });
};
