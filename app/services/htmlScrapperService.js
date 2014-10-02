/**
 * Created by drmegavolt on 9/7/14.
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
var carDetailsSrv = require('./htmlCarDetailsScrapperService');
var RSVP = require('rsvp');
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
        priceUSD: parseFloat(($priceUSD.text() || '0').replace(/[^\d]/g, '')),
        priceUAH: parseFloat(($priceUAH.text() || '0').replace(/[^\d]/g, '')),
        city: $city.text().trim(),
        site: config.host,
        relativeUrl: $relativeUrl.attr('href').trim(),
        photos: [$photo.attr('src')],
        source: config.name
    };
    return car;
}
module.exports.load = function (config) {
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
                return carDetailsSrv.load(config,car);
            })
            res(RSVP.all(promises))
        })
    })
};