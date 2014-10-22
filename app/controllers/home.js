"use strict";
var express = require('express'),
    router = express.Router(),
    processor = require('../services/processor');
var carSrv = require('../services/carService');
module.exports = function (app) {
    app.use('/', router);
};

router.get('/grab', function (req, res, next) {
    processor.process().then(function (cars) {
        res.render('index', {
            title: 'Generator-Express MVC',
            cars: cars || []
        });
    }).catch(function (err) {
        console.trace(err);
    });
});
router.get('/email', function (req, res, next) {
    processor.sendLatestCars(req, res, next);
});

router.get('/', function (req, res, next) {
    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 31);
    carSrv.getLatestCars(someDate).then(function (cars) {
        cars = cars || [];
        res.render('index', {
            title: 'Автомобили за последний месяц',
            cars: cars.map(function(car){return car.toObject()})
        });
    })


});
