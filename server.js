var cluster = require('cluster');
var winstonExpress = require('winston-express')
//var mongoose = require('mongoose');
winston = require('winston');

//var gulp = global.gulp  = require('gulp');
//require('./gulpfile.js');
//gulp.start('templates');
//mongoose.connect('mongodb://localhost/27017');
//var Schema = mongoose.Schema;
//
//var userSchema = new Schema({
//    name: String,
//    username: { type: String, required: true, unique: true },
//    password: { type: String, required: true },
//    admin: Boolean,
//    location: String,
//    meta: {
//        age: Number,
//        website: String
//    },
//    created_at: Date,
//    updated_at: Date
//});
//
//var User = mongoose.model('User', userSchema);
//
//module.exports = User;

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