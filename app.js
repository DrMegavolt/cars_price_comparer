var express = require('express'),
  config = require('./config/config'),
  fs = require('fs'),
  mongoose = require('mongoose');
var request = require('request');
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/\.js$/.test(file)) {
    require(modelsPath + '/' + file);
  }
});
var app = express();

require('./config/express')(app, config);


var interval = 10*60000;
setInterval(function(){
    "use strict";
    console.log('grabbing data');
    request('http://car-price-watcher.herokuapp.com/grab', function(err,resp){
        console.log(err)
    })

}, interval)

setInterval(function(){
    "use strict";
    console.log('sending email');
    request('http://car-price-watcher.herokuapp.com/email', function(err,resp){
        console.log(err)
    })

}, interval)
app.listen(config.port);