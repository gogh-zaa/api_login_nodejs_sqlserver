let Q = require('q');
var sql = require("mssql");
var db = require("../config");

module.exports = {
    login(username, password) {
        //  console.log("user :" + username + ", pass :" + password);

        let q = Q.defer();
        let q_login = "SELECT * FROM Login WHERE Username='" + username + "' AND Password='" + password + "'"

        sql.connect(db.config, function(err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // query to the database and get the data
            request.query(q_login, function(err, recordset) {

                sql.close();
                if (err) console.log(err)

                // send data as a response
                if (recordset.recordset[0] != undefined) {
                    //res.send(recordset.recordset[0]);
                    q.resolve(recordset);
                    //console.log("q resolve" + q.resolve(recordset));
                    // console.log(recordset.recordset[0]);

                } else {
                    q.reject(err);
                    console.log("login fail");
                    console.log(q.reject(err));
                }
            });
        });
        return q.promise;
    }
}