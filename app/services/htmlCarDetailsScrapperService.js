var request = require('request');
var RSVP = require('rsvp');
var cheerio = require('cheerio');
module.exports.load = function(config, car){
    return new RSVP.Promise(function (resolve, reject) {
        request(car.site + car.relativeUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
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