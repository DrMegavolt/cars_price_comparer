// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.configSchema = new Schema({
    name:String,
    host:String,
    searchUrl: String,
    titleSelector: String,
    sellerNameSelector: String,
    sellerPhoneSelector: String,
    citySelector: String,
    priceUAHSelector: String,
    urlSelector: String,
    priceUSDSelector: String,
    containerSelector: String,
    photoSelector:String,
    descriptionSelector: String,
    shortDescriptionSelector: String
});

