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
    emailTemplates(templatesDir, {
        helpers: {
            log: function (something) {
                return console.log(something);
            }
        }
    }, function (err, template) {


        var locals = {
            src: {
                'Автобазар': cars
            }
        }


        template('new_cars', locals, function (err, html, text) {
            if (err) {
                callback(err);
                return;
            }
            transporter.sendMail({
                from: '"Робот Сканер сайтов"<car@service.com>',
                to: 'sergeykuc@gmail.com',
                subject: 'Последние поступления с сайтов автомобилей',
                html: html
            }, callback)
        });
    });
}