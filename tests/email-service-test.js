var srv = require('../app/services/emailService');
var carSrv = require('../app/services/carService');


describe('emailService', function () {
   var cars = [{
        "title" : "AUDI  A8  2006",
        "priceUSD" : 6,
        "priceUAH" : 76,
        "city" : "Киевская обл.",
        "relativeUrl" : "/audi-a8-2006-kievskaya-1-3936990-1.html",
        "created" : new Date("2014-09-14T20:11:14.465Z"),
        "photos" : [
            "http://a2.s3.ua/r150/253/482253/41/ab0bfb9f-a162-45f9-b937-53d74ecae54f.jpg"
        ],
        "__v" : 0
    },
        /* 3 */
        {
            "title" : "AUDI  A8  2006",
            "priceUSD" : 6,
            "priceUAH" : 76,
            "city" : "Киевская обл.",
            "relativeUrl" : "/audi-a8-2006-kievskaya-1-3936990-1.html",
            "created" : new Date("2014-09-14T20:11:14.465Z"),
            "photos" : [
                "http://a2.s3.ua/r150/253/482253/41/ab0bfb9f-a162-45f9-b937-53d74ecae54f.jpg"
            ],
            "__v" : 0
        }];
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }
    cars = carSrv.getLatestCars(addDays(new Date(),-40));
    it('should send email', function (done) {
        srv.sendNewCarsEmail(cars,  function (error, crs) {

            done();
        });
    })
})