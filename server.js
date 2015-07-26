var cluster = require('cluster');
var winstonExpress = require('winston-express')
winston = require('winston');

//clustering to run 4 threads on one heroku dyno
 if (cluster.isMaster) {//TODO test that clusters work
     // Count the machine's CPUs
     var cpuCount = require('os').cpus().length;

     // Create a worker for each CPU
     for (var i = 0; i < cpuCount; i += 1) {
         cluster.fork();
     }

     var express = require('express'),
         app = express();
     winstonExpress(app, winston);
     app.use(express.static('www'));
     app.set('port', process.env.PORT || 5000);
     app.listen(app.get('port'), function () {
         console.log('Express server listening on port ' + app.get('port'));
     });
 }
  else {
     console.log('Hello from Worker ' + cluster.worker.id);
     console.log('Worker ' + cluster.worker.id + ' running!');

 }