"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require("../models/token");
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    req.user = null;

    const auth = req.headers?.authorization; // Token ...tokenKey... || Bearer ...jwtAccess...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...'] || ['Bearer', '...jwtAccess...']

    if (tokenKey && tokenKey[0] == "Token") { // Simple Token

        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate("userId");
        req.user = tokenData ? tokenData.userId : null;

    } else if (tokenKey && tokenKey[0] == "Bearer") { // JWT

        // jwt.verify(jwtToken, secretKey, callbackFunction)
        jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (error, accessData) => {
            // console.log('Error: ', error);
            // console.log('AccessData: ', accessData);

            req.user = accessData ? accessData : null;

        });

    };

    next();
};