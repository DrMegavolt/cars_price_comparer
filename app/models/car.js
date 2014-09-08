// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CarSchema = new Schema({
    title: String,
    relativeUrl: String,
    site: String,
    priceUSD: Number,
    priceUAH: Number,
    city: String,
    photos:Array
});


mongoose.model('Car', CarSchema);

