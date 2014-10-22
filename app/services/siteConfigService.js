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