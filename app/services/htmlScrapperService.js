/**
 * Created by drmegavolt on 9/7/14.
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
var configSrv = require('./configService');
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
module.exports.load = function (callback) {

    configSrv.getConfigs().then(function (configs) {
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            var url = config.host + config.searchUrl;
            request(url, function (error, response, body) {
                var $ = cheerio.load(body);
                var cars = [];
                $(config.containerSelector).each(function (index, element) {
                    var $e = $(element);
                    var $title = $e.find(config.titleSelector);
                    var $priceUSD = $e.find(config.priceUSDSelector);
                    var $priceUAH = $e.find(config.priceUAHSelector);
                    var $city = $e.find(config.citySelector);
                    var $photo = $e.find(config.photoSelector);
                    var $relativeUrl = $e.find(config.urlSelector);
                    cars.push({
                        title: $title.text().trim(),
                        priceUSD: parseFloat($priceUSD.text().trim()),
                        priceUAH: parseFloat($priceUAH.text().trim()),
                        city: $city.text().trim(),
                        relativeUrl: $relativeUrl.attr('href').trim(),
                        photos: [$photo.attr('src')],
                        source: config.name
                    })
                });
                callback(error, cars);
            })
        }
    }).catch(function (err) {
        console.log(err);
    });

};