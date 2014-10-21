// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.siteConfigSchema = new Schema({
    name:String,
    host:String,
    lastSentCarId: ObjectId


});

