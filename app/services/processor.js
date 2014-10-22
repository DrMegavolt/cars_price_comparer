/**
 * Created by drmegavolt on 9/11/14.
 */
"use strict";
var RSVP = require('rsvp'),
    services = require('../services')
var carSrv = services.carService;
var grabbers = require('../grabbers');
module.exports.process = function () {
    return services.configService.getConfigs().then(function (configs) {
        var promises = [];
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            var loader = config.listRequestMode === "HTML" ? grabbers.htmlGrabber : grabbers.ajaxGrabber;
            promises.push(loader.load(config)
                .then(carSrv.saveCars)
                .catch(function (err) {
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
            services.siteConfigService.getConfig().then(function(config){
                return services.emailService(config).sendNewCarsEmail(cars);
            })
        } else {
            console.log('no new cars');
        }

    })

}