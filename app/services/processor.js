/**
 * Created by drmegavolt on 9/11/14.
 */
var RSVP = require('rsvp');
var carSrv = require('../services/carService');
var configSrv = require('../services/configService');
var emailSrv = require('../services/emailService');
var scrapper = require('../services/htmlScrapperService');
var ajaxScrapper = require('../services/ajaxScrapperService');
module.exports.process = function () {
    "use strict";

    return configSrv.getConfigs().then(function (configs) {
        var promises = [];
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            var loader = config.listRequestMode === "HTML" ? scrapper : ajaxScrapper;
            promises.push(loader.load(config).then(carSrv.saveCars).catch(function (err) {
                console.trace(err);
            }));
        }
        return RSVP.all(promises)
    })

}

module.exports.sendLatestCars = function (req, res) {
    var startdate = new Date(new Date().getTime() - 15 * 60000);
    carSrv.getLatestCars(startdate).then(function (cars) {
        if (cars && cars.length) {
            emailSrv.sendNewCarsEmail(cars, function (err) {
                console.log(err);
                res.render('index', {
                    title: 'EMAIL status ' + err,
                    articles: cars || []
                });
            })
        }else{
            console.log('no new cars');
        }

    })

}