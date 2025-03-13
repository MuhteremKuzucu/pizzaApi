"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require('../models/token');

module.exports = {
    list: async (req, res) => {
        /* 
            #swagger.tags = ['Tokens']
            #swagger.summary = 'List Tokens'
            #swagger.desription = `
                You can sen query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(Token);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Token),
            result
        })
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ['Tokens']
            #swagger.summary = 'Create Token'
        */

        const result = await Token.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        /* 
            #swagger.tags = ['Tokens']
            #swagger.summary = 'Get Single Token'
        */

        const result = await Token.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ['Tokens']
            #swagger.summary = 'Update Token'
        */

        const result = await Token.updateOne({ _id: req.params.id }, req.body, { runValidators: true });

        if (!result.modifiedCount) {
            res.errorStatusCode = 404
            throw new Error('Data is not updated.')
        }

        res.status(202).send({
            error: false,
            new: await Token.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /* 
            #swagger.tags = ['Tokens']
            #swagger.summary = 'Delete Token'
        */

        const result = await Token.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: 'Data is not found or already deleted.'
        })
    }
};