"use strict";
var express = require('express'),
    router = express.Router(),
    carSrv = require('../services/carService');
var scrapper = require('../services/htmlScrapperService');
var configSrv = require('../services/configService');
module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (req, res, next) {
    configSrv.getConfigs().then(function (configs) {
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            scrapper.load(config)
                .then(carSrv.saveCars)
                .then(function (cars) {
                    res.render('index', {
                        title: 'Generator-Express MVC',
                        articles: cars
                    });
                });
            })
        }
    }).catch(function (err) {
        console.log(err);
    });

});
