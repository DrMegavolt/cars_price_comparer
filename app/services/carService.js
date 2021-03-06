"use strict";
var RSVP = require('rsvp');
var CarModel = require('../models').CarModel;

module.exports.findCar= function(car){
    return CarModel.findOne({relativeUrl: car.relativeUrl}).exec();
};

module.exports.saveCars = function (cars) {
    var promises = cars.map(function (c) {
        return new RSVP.Promise(function (resolve, reject) {
            module.exports.findCar(c).then(function(car){
                if (car) {
                    resolve(null);
                    return;
                }// create only if not exist

                CarModel.create(c, function (err) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(c)
                    }
                })
            })

        })
    })
    return RSVP.all(promises);


}

module.exports.getLatestCars = function (timeToNow) {
    return CarModel.find({created: {$gte: timeToNow}}).sort({'created':-1}).exec();
}
