let jwt = require('jsonwebtoken');
let Q = require('q');

let secretKey = 'yousecretKey';

module.exports = {
    sign(playload) {
        let token = jwt.sign(playload, secretKey, {
            expiresIn: '1d'
        });

        return token;
    },

    verify(token) {
        let q = Q.defer();

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                q.reject(err)
            } else {
                q.resolve(decoded)
            }
        });

        return q.promise;
    }
}