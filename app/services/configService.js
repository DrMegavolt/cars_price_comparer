var q = require('q');
var mongoose = require('mongoose');
var configSchema = require('../models/config').configSchema;
var ConfigModel = mongoose.model('scrapperConfig', configSchema, 'scrapperConfigs');

module.exports.getConfigs = function () {
    return q.ninvoke(ConfigModel , "find",{});
}