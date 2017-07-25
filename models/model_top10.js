let Q = require('q');
var sql = require("mssql");
var db = require("../config");

module.exports = {
    query_top10(con) {
        //console.log("query_top10");
        //  let con = db.config2;
        let q = Q.defer();
        let q_top10 = `SELECT TOP 10 SUM(soinvdt.goodamnt) as toooo,goodname FROM EMGood 
                        left outer join SOInvDT on emgood.GoodID=soinvdt.GoodID 
                        WHERE goodname is not null    
                        GROUP BY GoodName order by toooo desc`;

        sql.connect(con, function(err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // query to the database and get the data
            request.query(q_top10, function(err, recordset) {
                sql.close();
                if (err) console.log(err)
                    // send data as a response
                if (recordset != undefined) {
                    q.resolve(recordset);
                } else {
                    q.reject(err);
                }
            });
        });
        return q.promise;
    },

    testq(con) {

        let q = Q.defer();
        let q_login = "SELECT * FROM Login ";
        let q_top10 = `SELECT TOP 10 SUM(soinvdt.goodamnt) as toooo,goodname FROM EMGood 
                        left outer join SOInvDT on emgood.GoodID=soinvdt.GoodID 
                        WHERE goodname is not null    
                        GROUP BY GoodName order by toooo desc`;

        sql.connect(con, function(err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // query to the database and get the data
            request.query(q_top10, function(err, recordset) {

                sql.close();
                if (err) console.log(err)

                // send data as a response
                if (recordset != undefined) {

                    q.resolve(recordset);
                } else {
                    q.reject(err);
                    console.log("login fail");
                    console.log(q.reject(err));
                }
            });
        });
        //  console.log("promise :" + q.promise);
        return q.promise;
    }
}