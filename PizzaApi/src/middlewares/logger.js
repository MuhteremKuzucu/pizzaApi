"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// Logger
// $ npm i morgan
// $ https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan');
const fs = require('node:fs');

const customLog = 'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'
const now = new Date();
const today = now.toISOString().split('T')[0]

module.exports = morgan(customLog, {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
});