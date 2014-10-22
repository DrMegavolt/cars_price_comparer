"use strict";
var processor = require('../app/services/processor');
var mongoose = require('mongoose');
var config = require('../config/config');
mongoose.connect(config.db);
describe('processor ', function () {
    it('should load all cars ', function (done) {
        processor.process().then(function(cars){
            cars.should.have.length(3);
            done();
        }).catch(function(error){
            done(error);
        });
    })
})