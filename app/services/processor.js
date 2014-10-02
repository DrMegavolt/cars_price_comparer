/**
 * Created by drmegavolt on 9/11/14.
 */
var RSVP = require('rsvp');
var carSrv = require('../services/carService');
var configSrv = require('../services/configService');
var emailSrv = require('../services/emailService');
var scrapper = require('../services/htmlScrapperService');
var ajaxScrapper = require('../services/ajaxScrapperService');
module.exports.process = function (req, res, next) {
    "use strict";

    configSrv.getConfigs().then(function (configs) {
        var promises = [];
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            var loader = config.listRequestMode === "HTML" ? scrapper : ajaxScrapper;
            promises.push(loader.load(config).then(carSrv.saveCars).catch(function (err) {
                console.log(err);
            }));
        }
        return RSVP.all(promises)
    }).then(function (cars) {
        res.render('index', {
            title: 'Generator-Express MVC',
            articles: cars
        });
    }).catch(function (err) {
        console.log(err);
    })

}

module.exports.sendLatestCars = function (req, res) {
    console.log(new Date().getTime() - 30 * 60000);
    var startdate = new Date(new Date().getTime() - 3000 * 60000);
    carSrv.getLatestCars(startdate).then(function (cars) {
        if (cars && cars.length) {
            emailSrv.sendNewCarsEmail(cars, function (err) {
                console.log(err);
                res.render('index', {
                    title: 'EMAIL status ' + err,
                    articles: cars
                });
            })
        }else{
            console.log('no new cars');
        }

    })

}