"use strict";
var ConfigModel = require('../models').SiteConfigModel;
module.exports.getConfig = function () {
    return ConfigModel.findOne({}).exec();
}


module.exports.updateLastSavedTime = function(date){
    return ConfigModel.findOneAndUpdate({},{lastSentCar:(date || new Date())}).exec();
}