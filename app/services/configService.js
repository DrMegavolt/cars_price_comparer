var q = require('q');
var mongoose = require('mongoose');
var configSchema = require('../models/config').configSchema;
var ConfigModel = mongoose.model('Config', configSchema);
module.exports.saveCars = function (cars) {
    "use strict";
    for (var i = 0; i < cars.length; i++) {
        var c = cars[i];
        q.defer();
        CarModel.findOne({relativeUrl: c.relativeUrl}).exec(function (err, car) {
            if (!car) { // create only if not exist
                //TODO:TEST
                CarModel.create(c, function (err) {
                    console.log(err);
                })
            }
        })

    }
}

module.exports.getConfigs = function(){
    "use strict";
    return q.nfcall(ConfigModel.find);
}