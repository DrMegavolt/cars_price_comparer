var request = require('request');
var Iconv = require('iconv').Iconv;
var RSVP = require('rsvp');
var fromEnc = 'utf-8';
var toEnc = 'utf-8//IGNORE';
var cheerio = require('cheerio');
module.exports.load = function(config, car){
    fromEnc = config.encoding? config.encoding: fromEnc;
    var translator = new Iconv(fromEnc,toEnc);
    return new RSVP.Promise(function (resolve, reject) {
        request({url: car.site + car.relativeUrl, encoding:null}, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            body = translator.convert(body).toString();
            var $ = cheerio.load(body);
            var $sellerName = $(config.sellerNameSelector);
            var $sellerPhone = $(config.sellerPhoneSelector);
            var $description = $(config.descriptionSelector);
            var $shortDescription = $(config.shortDescriptionSelector);
            try {
                car.seller = $sellerName.text().trim();
                car.phone = $sellerPhone.text().trim();
                car.description = $description.text().trim();
                car.shortDescription = $shortDescription.text().trim();
            }
            catch(error){
                console.log(error);
            }
            resolve(car);
        })
    });
}