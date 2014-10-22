"use strict";
var express = require('express'),
    router = express.Router(),
    services = require('../services'),
    processor = services.processor,
    carSrv = services.carService;
module.exports = function (app) {
    app.use('/', router);
};

router.get('/grab', function (req, res, next) {
    processor.process().then(function (cars) {
        cars = cars || [];
        var result = [];
        cars.forEach(function (item) {
            var arr = item || [];
            result = result.concat(arr.filter(function (c) {
                return c;
            }));
        })
        res.render('index', {
            title: 'Generator-Express MVC',
            cars: result
        });
    }).catch(function (err) {
        console.trace(err);
    });
});
router.get('/email', function (req, res, next) {
    processor.sendLatestCars().then(function (cars) {
        res.render('index', {
            title: 'EMAIL status:' + ( cars ? 'OK' : 'No New Cars'),
            cars: []
        });
    }).catch(console.trace);
});

router.get('/', function (req, res, next) {
    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 31);
    carSrv.getLatestCars(someDate).then(function (cars) {
        cars = cars || [];
        res.render('index', {
            title: 'Автомобили за последний месяц',
            cars: cars.map(function (car) {
                return car.toObject()
            })
        });
    })


});
