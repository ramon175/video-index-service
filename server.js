const express = require("express"),
app = express(),
cfenv = require("cfenv"),
bodyParser = require('body-parser'),
multipart = require('connect-multiparty'),
multipartMiddleware = multipart(),
path = require('path');
fs = require('fs');
var multer = require("multer");

const cors = require('cors');

// var upload = multer({ dest: './videos/' })


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(cors());

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

//controller
var controller = require('./controller/controller'); 
//
//prepare to receive file via POST
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './videos')
	},
	filename: function(req, file, callback) {
        callback(null, file.fieldname + path.extname(file.originalname));
        return file.fieldname;
	}
});
//

//route to receive file
app.post('/api/file',multipartMiddleware, function(req, res) {
    var file = req.files;
    var filename = '';

    if(file != null || file != undefined){
        var fileobjname = Object.keys(file);
        filename = file[fileobjname].originalFilename;
        console.log(filename);
    }

	var upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.avi' && ext !== '.mp4' && ext !== '.MOV') {
                return callback(res.end('Only videos are allowed'), null)
            }
            callback(null, true)
        }
    })
    .single(filename);

	upload(req, res, function(err) {
        res.status(200).json({status:'ok', message:'File uploaded'});

    })
    
    
});