const fs = require("fs");
const { IamAuthenticator } = require("ibm-watson/auth");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const multer = require("multer");
const sendMessages = require("./sendMessage");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: "VTKJN7FN5M58XqdxZxsPG5emWhVFXALeauET3BJNdSFr",
  }),
  url:
    "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/86013465-bcaf-4a25-ac6b-a86daee48fed/v1/recognize",
});

var params = {
  objectMode: true,
  contentType: "audio/webm",
  model: "pt-BR_BroadbandModel",
};
const speech = (name, res) => {
  function convert(input, output, callback) {
    ffmpeg(input)
      .output(output)
      .on("end", function () {
        console.log("conversion ended");
        callback(null);
      })
      .on("error", function (err) {
        console.log("error: ", err);
        callback(err);
      })
      .run();
  }
  const newName = `public/sound/convert-${Date.now()}.webm`;

  convert(`public/sound/${name}`, newName, function (err) {
    if (!err) {
      var recognizeStream = speechToText.recognizeUsingWebSocket(params);

      fs.createReadStream(newName).pipe(recognizeStream);

      console.log(newName);

      let text = "";

      recognizeStream.on("data", function (event) {
        event.results.map(
          (i) => (text = `${text}${i.alternatives[0].transcript}`)
        );
        sendMessages(text, res);
      });
      recognizeStream.on("error", function (event) {
        console.log("Error:", event);
      });
    }
  });
};

module.exports = speech;
