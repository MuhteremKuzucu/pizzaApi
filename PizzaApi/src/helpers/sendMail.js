"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const nodemailer = require('nodemailer');

module.exports = function sendMail(to, subject, message) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kuzucumuhterem@gmail.com',
            pass: 'drbl rskd knap houe'
        }
    });

    // Send Mail
    transporter.sendMail({
        from: 'kuzucumuhterem@gmail.com',
        to: to,
        subject: subject,
        text: message,
        html: message

    }, function (error, success) {

        success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
    });


}