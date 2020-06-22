const port = process.env.PORT || 3001;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const uploadResource = require("./controllers/upload")();
const publicRouter = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
publicRouter.use(`/${uploadResource.name}`, uploadResource.routes);

app.use(express.static("public"));
app.use(publicRouter);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
