const routes = require("./routes");
const controller = require("./controller");

module.exports = () => ({
  name: "chat",
  routes: routes(controller)
});