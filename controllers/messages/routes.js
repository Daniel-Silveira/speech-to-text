const express = require("express");

module.exports = (controller) => {
  const router = express.Router();
  router.post("/send", controller.send);
  router.get("/session", controller.session);
  return router;
};
