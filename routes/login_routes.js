var express = require('express');
var router = express.Router();
//module
var crypto = require('crypto');
var moment = require('moment');
//-------db
var sql = require("mssql");
var db = require("../config");
//--
var User = require('../models/login_model');
var Jwt = require('../models/jwt');


router.post('/login', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {

        //encryptedPassword by md5
        let encryptedPassword = crypto.createHash('md5').update(password).digest('hex');
        //login sucess
        User.login(username, encryptedPassword)
            .then((recordset) => {
                if (recordset.recordset) {
                    let userName = recordset.recordset[0].username;

                    let token = Jwt.sign({ userName: userName });
                    console.log(token);
                    res.send({ ok: true, token: token });
                } else {
                    res.send({ ok: false, error: 'Invalid username/password!' });
                }
            }, (error) => {
                res.send({ ok: false, error: error });
            })
    } else { // incorrect data
        res.send({ ok: false, error: 'Incorrect data!' });
    }

});

module.exports = router;