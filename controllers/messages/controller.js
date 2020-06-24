const sendMessages = require("../../services/sendMessage");
const getSession = require("../../services/getSession");

const controller = {
  send: async (req, res) => {
    const { message, sessionId } = req.body;
    console.log(req.body);
    try {
      sendMessages(sessionId, message, res);
    } catch (err) {
      res.status(500).send({ error: "Send failed" });
    }
  },
  session: async (req, res) => {
    try {
      getSession(res);
    } catch (err) {
      res.status(500).send({ error: "Get session failed" });
    }
  },
};

module.exports = controller;
