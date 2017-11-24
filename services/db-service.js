//load cloudant configs
require('dotenv').load();

const Cloudant = require('cloudant');

var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;

var cloudant = Cloudant({
    account: username,
    password: password
});

var database = cloudant.db.use('indexes');
//-----------------------

module.exports = {
    insertTranscription: (doc) =>{
        database.insert(doc)
    }
}