const jwt = require('jsonwebtoken');


var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);


module.exports = (req, res, next) => {
    try {
        const signedData = jwt.verify(req.headers.access_token, process.env.SecretKey);
        req.signedData =  signedData;
        next();
    } catch (err) {
        console.log(req.headers);
        console.error(err);
        res.statusCode = 401;
        res.json({ success: false, message: "Authentication failed" });
    }
}