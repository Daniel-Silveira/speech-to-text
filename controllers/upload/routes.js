const express = require("express");

module.exports = (controller) => {
  const router = express.Router();
  router.post("/new", controller.new);
  return router;
};
