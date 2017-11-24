var ffmpeg = require('fluent-ffmpeg');

module.exports = {
    getConversion: (input,callback) => {

        console.log('Starting Conversion')

        //    ffmpeg(input)
        //     .output(output)
        //     .on('end', () =>{
        //         console.log('Conversion ended');
        //         console.log(output)
        //         callback(output);
        //     }).on('error',(err) => {
        //         console.log("error:",err.code,err.msg);
        //         callback(err);
        //     }).run();
        ffmpeg(input).noVideo().output('./audios/audio.wav')
        .on('end', () =>{
            console.log('Conversion ended');
            callback('./audios/audio.wav');
        }).run();
    }
};