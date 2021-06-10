const jwt = require('jsonwebtoken');

//check the authentication
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