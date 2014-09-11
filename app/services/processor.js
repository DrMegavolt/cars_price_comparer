/**
 * Created by drmegavolt on 9/11/14.
 */
var carSrv = require('../services/carService');
var scrapper = require('../services/htmlScrapperService');
module.exports.process = function (){
    "use strict";
    scrapper.load(function(err, cars){
        carSrv.saveCars(cars, function(){

        });
    })
}

module.exports.sendLatestCars = function(){
    "use strict";

}