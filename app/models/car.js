// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


module.exports.carSchema = new Schema({
    title: String,
    seller: String,
    phone: String,
    relativeUrl: String,
    site: String,
    priceUSD: { type: Number, default: 0 },
    priceUAH: { type: Number, default: 0 },
    city: String,
    description: String,
    shortDescription: String,
    photos:Array,
    created:  {type: Date, default: Date.now}
});

