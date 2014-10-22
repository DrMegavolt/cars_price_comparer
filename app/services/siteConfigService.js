"use strict";
var ConfigModel = require('../models').SiteConfigModel;
module.exports.getConfig = function () {
    return new Promise(function (resolve, reject) {
        ConfigModel.findOne({}, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}


module.exports.updateLastSavedTime = function(){
    return new Promise(function (resolve, reject) {
        ConfigModel.findAndModify({},null,{lastSentCar:new Date()}, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}