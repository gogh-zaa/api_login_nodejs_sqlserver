var express = require('express');
var router = express.Router();
//module
var crypto = require('crypto');
var moment = require('moment');
//-------db
var sql = require("mssql");
var db = require("../config");
//--model
var report = require('../models/model_top10');
var Jwt = require('../models/jwt');

router.post('/top10', function(req, res, next) {

    let token = req.headers['x-access-token'];

    if (token) {

        //login sucess
        report.query_top10(db.config2)
            .then((recordset) => {
                if (recordset.recordset) {
                    //console.log("return data");
                    // console.log(recordset.recordset);
                    res.send(recordset.recordset);
                    //  res.send({ ok: true, token: token });

                } else {
                    res.send({ ok: false, error: 'Invalid token' });
                }
            }, (error) => {
                res.send({ ok: false, error: error });
            })
    } else { // incorrect data
        res.send({ ok: false, error: 'Incorrect data!' });
    }
    //

});

module.exports = router;