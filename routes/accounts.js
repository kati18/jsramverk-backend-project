/**
 * Routes in project.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const accounts = require("../src/accounts.js");
const login = require("../src/login.js");


/**
 * @param Object req The request
 * @param Object res The response
 */
router.get('/:email',
    // (req, res, next) => login.checkToken(req, res, next),
    (req, res) => {
        // console.log(req.params.email);
        // console.log("typeof från routes/account.js: ", typeof req.params.email); // string

        accounts.getAccount(req, res, req.params.email)
            .then((result) => {
                // console.log("result från routes reports.js: ", result);
                res.status(200).json({
                    data: {
                        status: 200,
                        type: "success",
                        message: "Account found",
                        data: result
                    }
                });
            })
            .catch((err) => {
                // console.log("err från routes reports.js: ", err);
                res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/",
                        title: "Database error",
                        detail: err
                    }
                });
                throw err;
            });
    }
);


/**
 * @param Object req The request
 * @param Object res The response
 */
router.post('/',
    (req, res, next) => login.checkToken(req, res, next),
    (req, res) => {
        // console.log("req.body från post i routes/accounts.js: ", req.body);

        if (req.body.deposit === "" || isNaN(req.body.deposit)) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/accounts",
                    title: "Deposit is missing or invalid",
                    detail: "Deposit amount is missing or is an invalid value"
                }
            });
        }

        accounts.updateAccount(res, req.body)
            .then(() => {
                res.status(201).json({
                    data: {
                        status: 201,
                        type: "success",
                        message: "Account successfully updated!"
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err
                    }
                });
                // console.log("error från catch error: ", err);
                // throw err;
            });
    }
);

module.exports = router;
