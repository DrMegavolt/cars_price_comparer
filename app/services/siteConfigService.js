"use strict";
var ConfigModel = require('../models').SiteConfigModel;
module.exports.getConfig = function () {
    return ConfigModel.findOne({}).exec();
}


module.exports.updateLastSavedTime = function(){
    return ConfigModel.findOneAndUpdate({},{lastSentCar:new Date()}).exec();
}