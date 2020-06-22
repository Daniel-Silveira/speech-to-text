const routes = require("./routes");
const controller = require("./controller");

module.exports = () => ({
  name: "upload",
  routes: routes(controller)
});