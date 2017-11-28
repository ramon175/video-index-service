require('dotenv').config();

var fs = require('fs');

var db = require('./db-service');

var Speech_to_text = require('watson-developer-cloud/speech-to-text/v1');

var username = process.env.SPEECH_TO_TEXT_USERNAME;
var password = process.env.SPEECH_TO_TEXT_PASSWORD;

var stt = new Speech_to_text({
        username: username,
        password: password    
});

module.exports = {

    sttFunc: (source) => {
        console.log('Transcription Started....');

        var transcriptionDoc = {
            sttResult: ''
        };


        var params = {
            audio:fs.createReadStream(source),
            model: 'pt-BR_NarrowbandModel',
            content_type: 'audio/wav',
          };

          stt.recognize(params, function(err, res) {
            if (err)
              console.log(err);
            else{
                transcriptionDoc.sttResult = res;

                db.insertTranscription(transcriptionDoc.sttResult).then(() => console.log('inserted'));

                
            }
          });

        // recognizeStream = stt.createRecognizeStream(params);

        // fs.createReadStream(source).pipe(recognizeStream);
        
        // recognizeStream.pipe(fs.createWriteStream('./transcriptions/transcription.txt'));

        
        
        // recognizeStream.setEncoding('utf-8');

        // recognizeStream.on('close', function(event) {
        //      onEvent('Close:', event);
        //      var jsonData = {};
        //      jsonData.text = JSON.parse(+fs.readFile('./transcriptions/transcription.txt'));
        //      console.log(jsonData);
        //     });

        // function onEvent(name, event) {
        //     console.log(name, JSON.stringify(event, null, 2));
        //   };
    }

}



