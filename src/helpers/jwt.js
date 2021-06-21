
const expressJwt = require('express-jwt');
// const {secret} = require('./config')
 

function jwt() {
    secret = 'lakshan'
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/login'
        ]
    });
}

module.exports = jwt;