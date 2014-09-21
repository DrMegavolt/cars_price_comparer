/**
 * Created by drmegavolt on 9/11/14.
 */
var carSrv = require('../services/carService');
var configSrv = require('../services/configService');
var scrapper = require('../services/htmlScrapperService');
var ajaxScrapper = require('../services/ajaxScrapperService');
module.exports.process = function (req, res, next) {
    "use strict";

    configSrv.getConfigs().then(function (configs) {
        var promises = [];
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            var loader = config.listRequestMode === "HTML" ? scrapper : ajaxScrapper;
            promises.push(loader.load(config).then(carSrv.saveCars));
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

module.exports.sendLatestCars = function () {
    "use strict";

}