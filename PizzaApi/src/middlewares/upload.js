"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

// UPLOAD (Multer Middleware)
// npm i multer
// https://expressjs.com/en/resources/middleware/multer.html

const multer = require('multer');

module.exports = multer({
    // dest: './uploads' // destination of images
    storage: multer.diskStorage({
        destination: './uploads', // indicate destination
        filename: function (req, file, cb) { // Renames file
            // console.log('file:', file);
            // cb(error, fileName) 
            // cb(null, file.originalname)
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
});