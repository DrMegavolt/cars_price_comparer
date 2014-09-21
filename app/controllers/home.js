"use strict";
var express = require('express'),
    router = express.Router(),
    processor = require('../services/processor');
module.exports = function (app) {
    app.use('/', router);
};

router.get('/',function(req,res, next){
    processor.process(req,res,next);
});
