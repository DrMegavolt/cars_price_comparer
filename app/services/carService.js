var RSVP = require('rsvp');
var mongoose = require('mongoose');
var carSchema = require('../models/car').carSchema;
var CarModel = mongoose.model('Car', carSchema);
module.exports.saveCars = function (cars) {
    var promises = cars.map(function (c) {
        return new RSVP.Promise(function (resolve, reject) {
            CarModel.findOne({relativeUrl: c.relativeUrl}).exec(function (err, car) {
                if (err) {
                    reject(err)
                    return;
                }
                if (car) {
                    resolve(car);
                    return;
                }// create only if not exist
                resolve(new RSVP.Promise(function (res, rej) {
                    CarModel.create(c, function (err) {
                        if (err) {
                            rej(err);
                        } else {
                            res(c)
                        }
                    })
                }))
            })
        })
    })
    return RSVP.all(promises);


}

module.exports.getLatestCars = function (timeToNow) {
    "use strict";
    return q.nfcall(CarModel.find, {created: {$gte: timeToNow}});
}