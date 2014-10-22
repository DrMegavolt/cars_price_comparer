"use strict";
var mongoose = require('mongoose');
var srv = require('../app/services').emailService;
var carSrv = require('../app/services').carService;

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
            srv({emailRecipients:'sergeykuc@gmail.com'}).sendNewCarsEmail(cars).then(function (result) {
                done();
            }).catch(function(err){
                console.trace(err);
                done(err);
            });

        });

    })
})