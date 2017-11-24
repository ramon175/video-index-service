const sttService = require('../services/stt-service');
const conversionService = require('../services/conversion-service');

// const outputPath = '../audios/conversion.wav';

module.exports = {
    
    index: (videoPath) =>{
        //call to the conversion Service
        conversionService.getConversion(videoPath,(output) => {
            //call to the Watson Stt service
            sttService.sttFunc(output);
        });

    }

}