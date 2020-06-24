const express = require("express");

module.exports = (controller) => {
  const router = express.Router();
  router.post("/new/:sessionId", controller.new);
  return router;
};
