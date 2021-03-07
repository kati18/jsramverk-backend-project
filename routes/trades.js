/**
 * Routes in project jsramverk. Initially duplicate of reports.js.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const trades = require("../src/trades.js");
const login = require("../src/login.js");
const loggs = require("../src/loggs.js");


/**
 * @param Object req The request
 * @param Object res The response
 */
router.post('/buy',
    (req, res, next) => login.checkToken(req, res, next),
    (req, res) => {
        // console.log("Kommer vi hit i trade.js???"); // yes!!!
        // console.log("req.body från buyMushrooms in routes/trades.js: ", req.body);

        let liquidAssets = parseInt(req.body.liquidAssets),
            realTimePrice = parseFloat(req.body.realTimePrice),
            amount = parseInt(req.body.amount),
            cost = realTimePrice * amount;

        if (cost > liquidAssets) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/trade/buy",
                    title: "Cost exceeds liquid assets",
                    detail: "Cost exceeds available liquid assets "
                }
            });
        }

        trades.buyMushrooms(res, req.body)
            .then(() => {
                res.status(201).json({
                    data: {
                        status: 201,
                        type: "success",
                        message: "Purchase successfully performed!"
                    }
                });
                // console.log("1req.body från trades.mushroom i routes/trades.js: ", req.body);
            })
            .then(() => {
                // console.log("2req.body från trades.mushroom i routes/trades.js: ", req.body);
                loggs.addToLoggBuy(res, req.body);
            })
            .catch((err) => {
                res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/trade" + req.path,
                        title: "Database error",
                        detail: err
                    }
                });
                // console.log("error från catch error: ", err);
                // throw err;
            });
    }
);


/**
 * @param Object req The request
 * @param Object res The response
 */
router.post('/sell',
    (req, res, next) => login.checkToken(req, res, next),
    (req, res) => {
        // console.log("Kommer vi hit i routes/trade.js???"); // yes!!!
        // console.log("req.body från sellMushrooms in routes/trades.js: ", req.body);

        let mushroomToSell = req.body.mushroom,
            amountToSell = parseInt(req.body.amount),
            ownedTratt = parseInt(req.body.ownedTratt),
            ownedSten = parseInt(req.body.ownedSten);

        // console.log('mushroomToSell : ', mushroomToSell);
        // console.log('amountToSell : ', amountToSell);
        // console.log('ownedTratt : ', ownedTratt);
        // console.log('ownedSten : ', ownedSten);


        if (mushroomToSell.includes("Sten")) {
            if (amountToSell > ownedSten) {
                // console.log("Har inte tillräckligt med stenisar!!!");
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/trade/buy",
                        title: "Amount exceeds holding",
                        detail: "Amount to sell exceeds current holding"
                    }
                });
            } else {
                // console.log("In i trade.sellMushrooms från Sten");
                trades.sellMushrooms(res, req.body)
                    .then(() => {
                        res.status(201).json({
                            data: {
                                status: 201,
                                type: "success",
                                message: "Sell successfully performed!"
                            }
                        });
                    })
                    .then(() => {
                        // console.log("2req.body från trades.mushroom i routes/trades.js: ", +
                        //              req.body);
                        loggs.addToLoggSell(res, req.body);
                    })
                    .catch((err) => {
                        res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/trade" + req.path,
                                title: "Database error",
                                detail: err
                            }
                        });
                    // console.log("error från catch error: ", err);
                    // throw err;
                    });
            }
        } else if (mushroomToSell.includes("Tratt")) {
            if (amountToSell > ownedTratt) {
                // console.log("Har inte tillräckligt med trattisar!!!");
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/trade/buy",
                        title: "Amount exceeds holding",
                        detail: "Amount to sell exceeds current holding"
                    }
                });
            } else {
                // console.log("In i trade.sellMushrooms från Tratt");
                trades.sellMushrooms(res, req.body)
                    .then(() => {
                        res.status(201).json({
                            data: {
                                status: 201,
                                type: "success",
                                message: "Sell successfully performed!"
                            }
                        });
                    })
                    .then(() => {
                        // console.log("2req.body från trades.mushroom i routes/trades.js: ", +
                        //              req.body);
                        loggs.addToLoggSell(res, req.body);
                    })
                    .catch((err) => {
                        res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/trade" + req.path,
                                title: "Database error",
                                detail: err
                            }
                        });
                    // console.log("error från catch error: ", err);
                    // throw err;
                    });
            }
        }
    }
);


module.exports = router;
