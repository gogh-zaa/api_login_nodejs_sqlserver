 var express = require('express');
 var bodyParser = require('body-parser');
 var cors = require('cors');
 var app = express();
 var sql = require("mssql");
 var db = require('./config');

 app.use(bodyParser.json({ limit: '5mb' }));
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cors());

 app.use(function(req, res, next) {
     //console.log('Access-Control-Allow-Origin *');
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
     next();
 });

 var users = require('./routes/login_routes');

 app.use('/users', users);

 var port = 3000;
 var server = app.listen(port, function() {
     console.log('Server is running.. on Port ' + port);
 });

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
 });

 // error handler
 app.use(function(err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.render('error');
 });




 module.exports = app;