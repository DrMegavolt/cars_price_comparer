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



setInterval(function(){
    "use strict";
    request('http://car-price-watcher.herokuapp.com', function(err,resp){
        console.log(err)
    })

}, 60000)

setInterval(function(){
    "use strict";
    request('http://car-price-watcher.herokuapp.com/email', function(err,resp){
        console.log(err)
    })

}, 60000)
app.listen(config.port);