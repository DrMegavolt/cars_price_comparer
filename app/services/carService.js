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
                }
                if (!car) { // create only if not exist
                    //TODO:TEST
                    CarModel.create(c, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(car)
                        }
                    })
                }
            })
        })
    })
    return RSVP.all(promises);


}

module.exports.getLatestCars = function (timeToNow) {
    "use strict";
    return q.nfcall(CarModel.find, {created: {$gte: timeToNow}});
}