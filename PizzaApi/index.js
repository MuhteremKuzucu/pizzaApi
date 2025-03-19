"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm run dev
*/

const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// AsyncErrors to errorHandler:
require('express-async-errors');

// DB Connection:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());

// Auhentication:
app.use(require('./src/middlewares/authentication'));

// Query Handler
app.use(require('./src/middlewares/queryHandler'));

// Logger:
app.use(require('./src/middlewares/logger'));
/*------------------------------------------------------- */
// E-MAIL
// npm i nodemailer
// const nodemailer = require('nodemailer');

/* - Send email with ethereal(fake) email -*

// Create Test Account:
// nodemailer.createTestAccount().then(email => console.log(email));

//  {
//   user: 'qugm7t4rt4dezdq2@ethereal.email',
//   pass: '9V9uREfv9fZVzm4Hne',
//   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//   imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//   web: 'https://ethereal.email',
//   mxEnabled: false
// } 

// Connect to MailServer/ SMTP:
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'qugm7t4rt4dezdq2@ethereal.email',
        pass: '9V9uREfv9fZVzm4Hne'
    }
});

// console.log(transporter);

// Send Mail:
transporter.sendMail({
    from: 'qugm7t4rt4dezdq2@ethereal.email',
    to: 'info@clarusway.com',
    subject: "Hi There",
    text: "Hello there, how are you today?",
    html: "<p>Hello there, how are you <b>today?<b> </p>/"

}, function (error, success) {
    
    success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
});

/* - Send email with ethereal(fake) email -*/

/* - Send email with gmail service -*

// GoogleMail (gmail)
// Google -> AccountHome -> Security -> Two-Step-Verify (make it on) -> App-Passwords (if not showing use this link: https://myaccount.google.com/apppasswords)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ali@clarusway.com',
        pass: 'krkh fxow gujl cjhf'
    }
});

transporter.sendMail({
    from: 'ali@clarusway.com',
    to: 'info@clarusway.com',
    subject: "Hi There",
    text: "Hello there, how are you today?",
    html: "<p>Hello there, how are you <b>today?<b> </p>/"

}, function (error, success) {

    success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
});

/* - Send email with gmail service -*/


/* - Send email with yandex service -*

const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: 'test@yandex.com',
        pass: 'yourPersonelPasword'
    }
});

transporter.sendMail({
    from: 'qugm7t4rt4dezdq2@ethereal.email',
    to: 'info@clarusway.com',
    subject: "Hi There",
    text: "Hello there, how are you today?",
    html: "<p>Hello there, how are you <b>today?<b> </p>/"

}, function (error, success) {

    success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
});

/*- Send email with yandex service -*/

/* ------------------------------------------------------- */
//* Routes:

// HomePath
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
});

// Other routes
app.use('/', require('./src/routes/'));

// Static file route
// app.use('/uploads', express.static('./uploads'));
app.use('/images', express.static('./uploads'));

// Not found
app.all('*', (req, res) => {
    res.status(404).send({
        error: true,
        message: 'Route not available.'
    })
});

/* ------------------------------------------------------- */

// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
//! Syncronization (must be in commentLine):
// require('./src/helpers/sync')()