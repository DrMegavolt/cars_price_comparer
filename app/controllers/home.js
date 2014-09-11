"use strict";
var express = require('express'),
  router = express.Router(),
  carSrv = require('../services/carService');
var scrapper = require('../services/htmlScrapperService');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    scrapper.load(function(err, cars){
        carSrv.saveCars(cars, function(){
            res.render('index', {
                title: 'Generator-Express MVC',
                articles: cars
            });
        });


    })

});
