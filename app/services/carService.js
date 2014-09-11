var carSchema  = require('../models/car').carSchema;
var CarModel = mongoose.model('Car', carSchema);
module.exports.saveCars = function (cars) {
    "use strict";
    for (var i = 0; i < cars.length; i++) {
        var c  = cars[i];
       // var dbcar = new CarModel(c);
        //CarModel.findOne({relativeUrl: c.relativeUrl}).exec(function(err, car){
        //    console.log(car);
        //})
        CarModel.create(c,function(err){
            console.log(err);
        })
    }
}