// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


module.exports.carSchema = new Schema({
    title: String,
    seller: String,
    phone: String,
    relativeUrl: String,
    site: String,
    priceUSD: Number,
    priceUAH: Number,
    city: String,
    description: String,
    shortDescription: String,
    photos:Array,
    created:  {type: Date, default: Date.now}
});

