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

        // Render a single email with one template
        var locals = {cars: cars};

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