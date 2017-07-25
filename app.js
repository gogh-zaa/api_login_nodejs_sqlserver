 var express = require('express');
 var bodyParser = require('body-parser');
 var cors = require('cors');
 var app = express();
 var sql = require("mssql");
 var db = require('./config');
 var jwt = require('./models/jwt');
 var path = require('path');

 app.use(express.static(__dirname + '../public'));

 app.use(bodyParser.json({ limit: '5mb' }));
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cors());

 app.use(function(req, res, next) {
     //console.log('Access-Control-Allow-Origin *');
     res.setHeader("Access-Control-Allow-Headers", "*");
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH");


     next();
 });
 //login
 var users = require('./routes/routes_login');
 //report routes 
 var report = require('./routes/routes_report');

 //app path
 app.use('/users', users);
 app.use('/report', function(req, res, next) {
     //console.log(req.headers);
     //check token
     // console.log("go report");
     var token = req.body.token || req.query.token || req.headers['x-access-token'];
     //console.log(req.body.token);
     //  console.log(req.query.token);
     // console.log(req.headers['x-access-token']);
     //console.log(req.headers);
     jwt.verify(token)
         .then((decoded) => {
             req.decoded = decoded;
             // console.log("decoded :" + decoded);
             next();
         }, err => {
             //console.log("what the fuck");
             return res.status(403).send({
                 ok: false,
                 msg: 'No token provided.'

             });
         });
 }, report);


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