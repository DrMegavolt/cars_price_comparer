var srv = require('../app/services/emailService');
var carSrv = require('../app/services/carService');
var mongoose = require('mongoose');
config = require('../config/config'),

mongoose.connect(config.db);
describe('emailService', function () {

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    it('should send email', function (done) {
        carSrv.getLatestCars(addDays(new Date(),-40)).then(function(cars){
            "use strict";
            srv.sendNewCarsEmail(cars,  function (error, crs) {
                done();
            });

        });

    })
})