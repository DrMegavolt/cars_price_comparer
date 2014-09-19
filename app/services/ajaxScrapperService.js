"use strict"
var request = require('request');
var RSVP = require('rsvp');

var byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    while (a.length) {
        var n = a.shift();
        if (n in o) {
            o = o[n];
        } else {
            return;
        }
    }
    return o;
}
module.exports.load = function (config) {
    var url = config.host + config.searchUrl;
    return new RSVP.Promise(function (res, rej) {
        request(url, function (error, response, body) {
            if (error) {
                rej(error);
                return;
            }
            var json = JSON.parse(body);
            var ids = byString(json, config.idsSelector);
            var promises = ids.map(function (id) {
                return new RSVP.Promise(function (resolve, reject) {

                })
            });
            res(RSVP.all(promises));

        });

    });
}