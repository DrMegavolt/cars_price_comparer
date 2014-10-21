/**
 * Created by drmegavolt on 10/21/14.
 */
var mongoose = require('mongoose');
exports.mongoose = mongoose;
exports.carSchema = require('./car').carSchema;
exports.configSchema = require('./config').configSchema;
exports.siteConfigSchema = require('./siteConfig').siteConfigSchema;

exports.ConfigModel = mongoose.model('scrapperConfig', exports.configSchema, 'scrapperConfigs');
exports.CarModel = mongoose.model('Car', exports.carSchema);