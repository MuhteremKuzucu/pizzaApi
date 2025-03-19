"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router();
const pizza = require('../controllers/pizza');
const upload = require('../middlewares/upload');
/* ------------------------------------------------------- *
// UPLOAD (Multer Middleware)
// npm i multer
// https://expressjs.com/en/resources/middleware/multer.html

const multer = require('multer');

const upload = multer({
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

/* ------------------------------------------------------- */
// URL: /pizzas

router.route('/')
    .get(pizza.list)
    .post(upload.single('image'), pizza.create);
// .post(upload.array('image') ,pizza.create)
// .post(upload.any() ,pizza.create);

router.route('/:id')
    .get(pizza.read)
    .put(upload.single('image'), pizza.update)
    .patch(upload.single('image'), pizza.update)
    .delete(pizza.delete);

/* ------------------------------------------------------- */
module.exports = router;