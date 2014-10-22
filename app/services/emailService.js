"use strict";
var nodemailer = require('nodemailer'),
    path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'email_templates'),
    emailTemplates = require('email-templates');


module.exports = function (config) {
    var to = config.emailRecipients.join(', '); //'sergeykuc@gmail.com, serhiychernikov@gmail.com'
    //TODO: export to config
    var transporter = nodemailer.createTransport({
        service: 'Mandrill',
        auth: {
            user: 'drmegavolt@ua.fm',
            pass: 'F1ary_zUVA671Lb-7BQ-zg'
        }
    })


    return {
        sendNewCarsEmail: function (cars) {
            var promise = new Promise(function(resolve, reject){
                emailTemplates(templatesDir, {
                    helpers: {
                        log: function (something) {
                            return console.log(something);
                        }
                    }
                },
                function (err, template) {
                    var locals = {
                        src: {
                            'Автобазар': cars
                        }
                    }


                        template('new_cars', locals, function (err, html, text) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            transporter.sendMail({
                                from: '"Робот Сканер сайтов"<no-reply@cars.com>',
                                to: to,
                                subject: 'Последние поступления с сайтов автомобилей',
                                html: html
                            }, function(err){
                                if (err) { reject(err); return;}
                                resolve(html);
                            })
                        });
                    })

                });
            return promise;
        }
    };
}


