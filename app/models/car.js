// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


module.exports.carSchema = new Schema({
    title: String,
    relativeUrl: String,
    site: String,
    priceUSD: Number,
    priceUAH: Number,
    city: String,
    photos:Array,
    created:  {type: Date, default: Date.now}
});

