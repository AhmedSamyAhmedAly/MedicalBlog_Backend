const bcrypt = require('bcrypt');



module.exports = async(req, res, next) => {
    try {
        let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
        let randomIndex = Math.floor((Math.random() * 10) + 1);
        let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);

        req.signedData =  req.signedData + hashedRandomNumberToAppend ;
        next();
    } catch (err) {
        console.log(req.headers);
        console.error(err);
        res.statusCode = 401;
        res.json({ success: false, message: "Failed Logout" });
    }
}
