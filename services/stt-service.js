require('dotenv').config({path: '../.env'});

var fs = require('fs');

var Speech_to_text = require('watson-developer-cloud/speech-to-text/v1');

var username = process.env.STT_USERNAME;
var password = process.env.STT_PASSWORD;

var stt = new Speech_to_text({
        username: username,
        password: password    
});

var params = {
    model: 'en-US_BroadbandModel',
    content_type: 'audio/mp3',
    'interim_results': true,
    'max_alternatives': 3,
  };

var recognizeStream = stt.createRecognizeStream(params);

module.exports = {

    sttFunc: (source) => {
        fs.createReadStream(source).pipe(recognizeStream);
        
        recognizeStream.pipe(fs.createWriteStream('./transcriptions/transcription.txt'));
        
        recognizeStream.setEncoding('utf-8');

        recognizeStream.on('close', function(event) { onEvent('Close:', event); });

        function onEvent(name, event) {
            console.log(name, JSON.stringify(event, null, 2));
          };
    }

}



