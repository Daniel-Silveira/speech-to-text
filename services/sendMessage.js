const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const assistantId = "1464f5c9-8ddb-44bc-8d90-6ec6a9c4424f";

const assistant = new AssistantV2({
  version: "2020-04-01",
  authenticator: new IamAuthenticator({
    apikey: "lqclJB_GTbRBT-ZFP1sIVCrH3VhTTAtNubCiatDNgLNo",
  }),
  url:
    "https://api.us-south.assistant.watson.cloud.ibm.com/instances/2e1d630c-7d45-4fc6-b90d-3f08c24686bf",
});

const sendMessages = (text, response) => {
  assistant
    .createSession({
      assistantId,
    })
    .then((res) => {
      assistant
        .message({
          assistantId,
          sessionId: res.result.session_id,
          input: {
            message_type: "text",
            text: text,
          },
        })
        .then(({ result }) => {
          const textReponse = result.output.generic[0].text;
          console.log(textReponse);
          return response.status(200).send({ message: textReponse });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendMessages;
