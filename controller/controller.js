const sttService = require('../services/stt-service');
const conversionService = require('../services/conversion-service');

const outputPath = '../audios/conversion.mp3';

module.exports = {
    
    index: (video) =>{
        //call to the conversion Service
        conversionService.getConversion(video,outputPath,(output) => {
            //call to the Watson Stt service
            sttService.sttFunc(output);
        });

    }

}