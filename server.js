const express = require("express"),
    app = express(),
    cfenv = require("cfenv"),
    bodyParser = require('body-parser'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    path = require('path'),
    fs = require('fs'),
    multer = require("multer");

const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json());

app.use(cors());

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

//controller
var controller = require('./controller/controller');
//

var storage = multer.diskStorage({
    destination: './videos',
    filename: function(req, file, callback) {
        callback(null, file.fieldname + path.extname(file.originalname))
    }
});


var upload = multer({ storage:storage });


app.post('/api/file',upload.single('video'), function(req, res) {

    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');

        controller.index('./videos/video.avi');

        return res.send({
          success: true
        })
      }

    // var file = (req.files != undefined)?req.files[0]:null

    // var nome = Object.keys(req.files)[0];

    // var upload = multer({
    //     storage: storage
    // }).single('name');

    // upload(req, res, function(err) {
    //     if(!err){
    //         res.end('File is uploaded');
    //     }else{
    //         console.log(err);
    //     }
    // })
    
})