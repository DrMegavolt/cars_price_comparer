/**
 * Created by drmegavolt on 9/7/14.
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
var RSVP = require('rsvp');

//
//var config = {
//    name:'Автобазар (после ДТП)',
//    host:'http://avtobazar.ua',
//    searchUrl: '/poisk/avto/?country1=1911&period=168&show_only=all&currency=1915&after_dtp=yes_only&no_customs=no&in_credit=yes&exchange=yes&rent=no&autosalon_own=yes&order=-date_last_modify',
//    titleSelector: '.prod',
//    citySelector: '.city',
//    priceUAHSelector: '.price',
//    urlSelector: '.url',
//    priceUSDSelector: '.calc-price',
//    containerSelector: '.res_item',
//    photoSelector: '.photo'
//};
function extractCar($, element, config) {
    var $e = $(element);
    var $title = $e.find(config.titleSelector);
    var $priceUSD = $e.find(config.priceUSDSelector);
    var $priceUAH = $e.find(config.priceUAHSelector);
    var $city = $e.find(config.citySelector);
    var $photo = $e.find(config.photoSelector);

    var $relativeUrl = $e.find(config.urlSelector);
    var car = {
        title: $title.text().trim(),
        priceUSD: parseFloat($priceUSD.text().replace(/[^\d]/g, '')),
        priceUAH: parseFloat($priceUAH.text().replace(/[^\d]/g, '')),
        city: $city.text().trim(),
        site: config.host,
        relativeUrl: $relativeUrl.attr('href').trim(),
        photos: [$photo.attr('src')],
        source: config.name
    };
    return car;
}
module.exports.load = function (config, callback) {
    var url = config.host + config.searchUrl;
    return new RSVP.Promise(function (res, rej) {
        request(url, function (error, response, body) {
            if (error) {
                rej(error);
                return;
            }
            var $ = cheerio.load(body);
            var cars = [];
            $(config.containerSelector).each(function (index, element) {
                var car = extractCar($, element, config);
                cars.push(car);
            });

            var promises = cars.map(function (car) {
                return new RSVP.Promise(function (resolve, reject) {
                    request(car.site + car.relativeUrl, function (error, response, body) {
                        if (error) {
                            reject(error);
                        }
                        var $ = cheerio.load(body);
                        var $sellerName = $(config.sellerNameSelector);
                        var $sellerPhone = $(config.sellerPhoneSelector);
                        var $description = $(config.descriptionSelector);
                        var $shortDescription = $(config.shortDescriptionSelector);
                        car.seller = $sellerName.text().trim();
                        car.phone = $sellerPhone.text().trim();
                        car.description = $description.html();
                        car.shortDescription = $shortDescription.text().trim();
                        resolve(car);
                    })
                });
            })
            res(RSVP.all(promises))
        })
    })
};