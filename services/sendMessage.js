const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const assistantId = "aa55456b-9436-4a0f-8a29-c38c0b460dc1";

const assistant = new AssistantV2({
  version: "2020-04-01",
  authenticator: new IamAuthenticator({
    apikey: "QZHK4c_LARQsXpewvplxaYZBNi1jgPCFAX-NBfZ103f8",
  }),
  url:
    "https://api.us-south.assistant.watson.cloud.ibm.com/instances/c513114b-f750-4b0f-8327-c6e2692856aa",
});

const sendMessages = (sessionId, text, response) => {
  assistant
    .message({
      assistantId,
      sessionId,
      input: {
        message_type: "text",
        text: text,
      },
    })
    .then(({ result }) => {
      const generic = result.output.generic;
      const textReponse = generic[0].text;
      if (generic.length > 1) {
        const options = generic[1].options.map((i) => ({ label: i.label }));
        return response.status(200).send({ message: textReponse, options });
      }
      return response.status(200).send({ message: textReponse });
    })
    .catch((err) => {
      response.status(500).send({ status: 500, message: 'Mensagem não enviada' });
    });
};

module.exports = sendMessages;
