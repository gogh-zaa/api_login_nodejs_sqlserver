var express = require('express');
var router = express.Router();
//module
var crypto = require('crypto');
var moment = require('moment');
//-------db
var sql = require("mssql");
var db = require("../config");
//--
var User = require('../models/model_login');
var Jwt = require('../models/jwt');


router.post('/login', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {

        //encryptedPassword by md5
        let encryptedPassword = crypto.createHash('md5').update(password).digest('hex');
        //login sucess
        User.login(username, password)
            .then((recordset) => {
                if (recordset.recordset) {
                    let username = recordset.recordset[0].Username;
                    let status = recordset.recordset[0].Status;
                    let compcode = recordset.recordset[0].CompCode;
                    let brchid = recordset.recordset[0].BrchID;
                    // console.log("userName :" + userName);
                    //console.log(recordset);
                    //console.log("username :" + username + ",status :" + status + ", compcode :" + compcode + " , brchid :" + brchid);
                    let token = Jwt.sign({ username: username, status: status, compcode: compcode, brchid: brchid });
                    //console.log(token);
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