/**
 * Routes in project jsramverk. Initially duplicate of reports.js.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const loggs = require("../src/loggs.js");
// const login = require("../src/login.js");

/**
 * @param Object req The request
 * @param Object res The response
 */
router.get('/:email',
    // (req, res, next) => login.checkToken(req, res, next),
    (req, res) => {
        // console.log(req.params.email);
        // console.log("typeof från routes/account.js: ", typeof req.params.email); // string

        loggs.getLoggs(req, res, req.params.email)
            .then((result) => {
                // console.log("result från routes reports.js: ", result);
                res.status(200).json({
                    data: {
                        status: 200,
                        type: "success",
                        message: "Loggs found",
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


module.exports = router;
