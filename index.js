const fs = require("fs");
const { IamAuthenticator } = require("ibm-watson/auth");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: "VTKJN7FN5M58XqdxZxsPG5emWhVFXALeauET3BJNdSFr",
  }),
  url:
    "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/86013465-bcaf-4a25-ac6b-a86daee48fed/v1/recognize",
});

var params = {
  objectMode: true,
  contentType: "audio/flac",
  model: "pt-BR_BroadbandModel",
};

var recognizeStream = speechToText.recognizeUsingWebSocket(params);

fs.createReadStream("audio-file.flac").pipe(recognizeStream);

let text = "";

recognizeStream.on("data", function (event) {
  event.results.map((i) => (text = `${text}${i.alternatives[0].transcript}`));
  console.log(text);
});
recognizeStream.on("error", function (event) {
  console.log("Error:", event);
});
recognizeStream.on("close", function (event) {
  console.log("Close:", event);
});
