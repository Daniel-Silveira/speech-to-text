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

const getSession = (res) => {
  assistant
    .createSession({
      assistantId,
    })
    .then((response) => {
      res.status(200).send({ sessionId: response.result.session_id });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = getSession;
