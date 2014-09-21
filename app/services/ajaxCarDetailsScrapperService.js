var request = require('request');
var RSVP = require('rsvp');

module.exports.load = function (config, id) {

    return new RSVP.Promise(function (resolve, reject) {
        request(config.host + config.itemUrl.replace('{0}', id), function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            var json = JSON.parse(body);

            var car = {
                title: json.byString(config.titleSelector),
                priceUSD: parseFloat(json.byString(config.priceUSDSelector)),
                priceUAH: parseFloat(json.byString(config.priceUAHSelector)),
                city: json.byString(config.citySelector),
                site: config.host,
                relativeUrl: config.urlSelector.replace('{0}', id),
                photos: [json.byString(config.photoSelector)],
                source: config.name,
                seller: json.byString(config.sellerNameSelector),
                phone: json.byString(config.sellerPhoneSelector),
                description: json.byString(config.descriptionSelector),
                shortDescription: json.byString(config.shortDescriptionSelector)
            };
            resolve(car);
        })
    });
}