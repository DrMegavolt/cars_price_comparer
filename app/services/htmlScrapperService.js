/**
 * Created by drmegavolt on 9/7/14.
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
var q = require('q');

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
        priceUSD: parseFloat($priceUSD.text().trim()),
        priceUAH: parseFloat($priceUAH.text().trim()),
        city: $city.text().trim(),
        relativeUrl: $relativeUrl.attr('href').trim(),
        photos: [$photo.attr('src')],
        source: config.name
    };
    return car;
}
module.exports.load = function (config, callback) {
    var url = config.host + config.searchUrl;
    //q.nfcall(request)
    request(url, function (error, response, body) {
        var $ = cheerio.load(body);
        var cars = [];
        $(config.containerSelector).each(function (index, element) {
            var car = extractCar($, element, config);
            cars.push(car);
        });
        callback(error, cars);
    })


};