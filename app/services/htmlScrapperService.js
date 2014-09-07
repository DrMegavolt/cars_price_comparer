/**
 * Created by drmegavolt on 9/7/14.
 */
var request = require('request');
var cheerio = require('cheerio');
module.exports = function(){
    "use strict";
    var url = 'http://avtobazar.ua/poisk/avto/?country1=1911&period=168&show_only=all&currency=1915&after_dtp=yes_only&no_customs=no&in_credit=yes&exchange=yes&rent=no&autosalon_own=yes&order=-date_last_modify';
    request(url, function(error, response, body ){
        console.log(error)
        console.log(response)
        console.log(body)
    })

}