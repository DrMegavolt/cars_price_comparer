var q = require('q');
var ConfigModel = require('../models').ConfigModel;

module.exports.getConfigs = function () {
    return q.ninvoke(ConfigModel , "find",{});
}