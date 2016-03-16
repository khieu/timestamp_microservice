//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var express = require('express');
var strftime = require('strftime');

var app = express();

app.get('/', function(req, res) {
  res.sendfile('./client/index.html', {root: __dirname }); 
});

app.get(/^\/(.*)/, function(req,res){
  var obj = {
    "unix": null,
    "natural": null
  };
  var input = req.url.substring(1);
  console.log(input);
  if (input) {
    if (!isNaN(input) && Number(input) >= 0) {
      obj.unix = Number(input);
      obj.natural = strftime(
        '%B %d, %Y', 
        new Date(Number(input)*1000)
      )
    } else {
      var naturalDate = input.split('%20').join(" ");
      if (!isNaN(Date.parse(naturalDate))) {
        obj.unix = Date.parse(naturalDate)/1000;
        obj.natural = naturalDate;
      }
      
    }
    console.log(input.split('%20').join(" "));
  }
  console.log("url",req.url);
  res.send(obj);
});


var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Node.js listening on port ' + port + ' ...');
});

