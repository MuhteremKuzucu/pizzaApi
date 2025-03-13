"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA12345.?",
                }
            }
        */

        const { username, email, password } = req.body

        if (!((username || email) && password)) {
            res.errorStatusCode = 401;
            throw new Error('username/email and password are required.');
        };

        const user = await User.findOne({ $or: [{ username }, { email }], password });

        if (!user) {
            res.errorStatusCode = 401;
            throw new Error('Incorrect email/username and password.');
        };

        if (!user.isActive) {
            res.errorStatusCode = 401;
            throw new Error('This account is not active.');
        };

        let tokenData = await Token.findOne({ userId: user._id });

        if (!tokenData) {
            tokenData = await Token.create({
                userId: user._id,
                token: passwordEncrypt(Date.now() + user._id)
            });
        };

        res.status(200).send({
            error: false,
            token: tokenData.token,
            user
        });
    },

    logout: async (req, res) => {
        /*
           #swagger.tags = ["Tokens"]
           #swagger.summary = "Create Token"
        */

        const result = req.user ? await Token.deleteOne({ userId: req.user._id }) : null

        res.status(200).send({
            error: false,
            message: result?.deletedCount ? 'User logged out and token deleted.' : 'User Logged out.'
        });
    }
};