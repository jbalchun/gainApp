 //require('newrelic');
 //var logger = require('winston-papertrail').Papertrail;

 var winstonExpress = require('winston-express')
 winston = require('winston');

 // winstonExpress takes two parameters,
 // an express app, and a winston logger instance.

var express = require('express'),
    app = express();
 winstonExpress(app, winston);
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
