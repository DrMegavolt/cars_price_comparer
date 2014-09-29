var request = require('request');
var RSVP = require('rsvp');
getPropertyByString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    while (a.length) {
        var n = a.shift();
        if (n in o) {
            o = o[n];
        } else {
            return;
        }
    }
    return o || '';
}
module.exports.load = function (config, id) {

    return new RSVP.Promise(function (resolve, reject) {
        request(config.host + config.itemUrl.replace('{0}', id), function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            var json = JSON.parse(body);

            var photoUrl = getPropertyByString(json,config.photoSelector);
            photoUrl = photoUrl.indexOf('://')?photoUrl:config.host + photoUrl;
            var car = {
                title: getPropertyByString(json,config.titleSelector),
                priceUSD: parseFloat(getPropertyByString(json,config.priceUSDSelector)) || 0,
                priceUAH: parseFloat(getPropertyByString(json,config.priceUAHSelector)) || 0,
                city: getPropertyByString(json,config.citySelector),
                site: config.host,
                relativeUrl: config.urlSelector.replace('{0}', id),
                photos: [photoUrl],
                source: config.name,
                seller: getPropertyByString(json,config.sellerNameSelector),
                phone: getPropertyByString(json,config.sellerPhoneSelector),
                description: getPropertyByString(json,config.descriptionSelector),
                shortDescription: getPropertyByString(json,config.shortDescriptionSelector)
            };
            resolve(car);
        })
    });
}