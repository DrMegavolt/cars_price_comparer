"use strict";
var q = require('q');
var nodemailer = require('nodemailer'),
    path = require('path'),
    templatesDir = path.resolve(__dirname, '..', 'email_templates'),
    emailTemplates = require('email-templates');

var transporter = nodemailer.createTransport({
    service: 'Mandrill',
    auth: {
        user: 'drmegavolt@ua.fm',
        pass: 'F1ary_zUVA671Lb-7BQ-zg'
    }
})
module.exports.sendNewCarsEmail = function (cars, callback) {
    emailTemplates(templatesDir, function (err, template) {

        cars = [{
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

        /* 1 */
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
        },

        /* 2 */
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


        var locals = {sources:[
            {
                name: 'Автобазар',
                cars: cars
            },
            {
                name: 'AutoRia',
                cars: cars
            }
        ] };

        template('new_cars', locals, function (err, html, text) {
            if (err) {
                callback(err);
                return;
            }
            transporter.sendMail({
                from: 'car@service.com',
                to: 'sergeykuc@gmail.com',
                subject: 'hello',
                html: html
            }, callback)
        });
    });
}