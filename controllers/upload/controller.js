const path = require("path");
const multer = require("multer");
const speech = require("../../services/speech");

const controller = {
  new: async (req, res) => {
    const { sessionId } = req.params;
    let name = "";
    const storage = multer.diskStorage({
      destination: "./public/sound",
      filename: function (req, file, cb) {
        name = "audio" + Date.now() + path.extname(file.originalname) + ".mp3";
        cb(null, name);
      },
    });
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
    }).single("audio");
    try {
      upload(req, res, (err) => {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: "Save failed" });
        }
        speech(sessionId, name, res);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Save failed" });
    }
  },
};

module.exports = controller;
