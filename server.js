//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var path = require('path');

app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});