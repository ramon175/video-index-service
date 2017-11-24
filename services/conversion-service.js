var ffmpeg = require('fluent-ffmpeg');

module.exports = {
    getConversion: (input,output,callback) => {

        console.log('Starting Conversion')

           ffmpeg(input)
            .output(output)
            .on('end', () =>{
                console.log('Conversion ended');
                console.log(output)
                callback(output);
            }).on('error',(err) => {
                console.log("error:",err.code,err.msg);
                callback(err);
            }).run();
    }
};