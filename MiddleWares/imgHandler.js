var multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


// s3 bucket name
const BUCKET_NAME = 'medicaBlog';

//  S3 interface
const s3 = new AWS.S3({
    accessKeyId: process.env.Access_Key_ID,
    secretAccessKey: process.env.Secret_Access_Key
});

///// upload to S3 
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const key = 'img-' + Date.now();
            cb(null, key);
        }
    }),
});

module.exports = upload;