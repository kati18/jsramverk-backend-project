/**
 * Project jsramverk. Initially duplicate of reports.js.
 */

"use strict";

module.exports = {
    getLoggs: getLoggs,
    addToLoggBuy: addToLoggBuy,
    addToLoggSell: addToLoggSell
};


const sqliteDB = require("../db/database.js");



//  * Shows specific entries in the translog table.
// /**
//  * @async
//  * @returns void
//  */
function getLoggs(req, res, eMail) {
    return new Promise(function(resolve, reject) {
        let sql = `
                SELECT email, transaction_time, mushroom, amount, realtime_price
                FROM translog
                WHERE email = ? `;

        // sqliteDB.all(sql, (err, rows) => {
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
        sqliteDB.all(sql, eMail, function(err, rows) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                reject(err.message);
            } else if (rows.length == 0) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/loggs/" + eMail,
                        title: "Loggs not found",
                        detail: "Loggs with provided email not found."
                    }
                });
            }

            // console.log("rows från src/account.js: ", rows);
            resolve(rows);
        });
    });
}


/** Inserts a specific buy logg in the translog table.
 * Is called from route '/buy' in routes/trade.js and fucntion trades.buyMushrooms
 */
/**
 * @async
 * @returns void
 */
function addToLoggBuy(res, body) {
    return new Promise(function(resolve, reject) {
        // console.log("body från addToLogg in src/loggs.js: ", body);

        let email = body.email,
            transactionTime = body.timeStamp,
            mushroom = body.mushroom,
            amountBuy = "+" + body.amount,
            realTimePrice = body.realTimePrice;

        // console.log("email från src/trade.js: ", email);
        // console.log("transactionTime från src/trade.js: ", transactionTime);
        // console.log("mushroom från src/trade.js: ", mushroom);
        // console.log("amountBuy från src/trade.js: ", amountBuy);
        // console.log("realTimePrice från src/trade.js: ", realTimePrice);

        let data = [email, transactionTime, mushroom, amountBuy, realTimePrice],
            sql;

        // console.log("data: ", data);

        sql = `
            INSERT INTO translog
                (email, transaction_time, mushroom, amount, realtime_price)
            VALUES
                (?,?,?,?,?)`;

        sqliteDB.run(sql, data, function(err) {
            // console.log("data: ", data);
            if (err) {
                // console.log("error från src/trade.js: ", err);
                reject(err.message);
            }
            // console.log('req.body från db-function i src/trades.js: ', body);
            resolve(true);
        });
    });
}


/** Inserts a specific buy logg in the translog table.
 * Is called from route '/sell' in routes/trade.js and fucntion trades.sellMushrooms
 */
/**
 * @async
 * @returns void
 */
function addToLoggSell(res, body) {
    return new Promise(function(resolve, reject) {
        // console.log("body från addToLogg in src/loggs.js: ", body);

        let email = body.email,
            transactionTime = body.timeStamp,
            mushroom = body.mushroom,
            amountSell = "-" + body.amount,
            realTimePrice = body.realTimePrice;

        // console.log("email från src/trade.js: ", email);
        // console.log("transactionTime från src/trade.js: ", transactionTime);
        // console.log("mushroom från src/trade.js: ", mushroom);
        // console.log("amountSell från src/trade.js: ", amountSell);
        // console.log("realTimePrice från src/trade.js: ", realTimePrice);

        let data = [email, transactionTime, mushroom, amountSell, realTimePrice],
            sql;

        // console.log("data: ", data);

        sql = `
            INSERT INTO translog
                (email, transaction_time, mushroom, amount, realtime_price)
            VALUES
                (?,?,?,?,?)`;

        sqliteDB.run(sql, data, function(err) {
            // console.log("data: ", data);
            if (err) {
                // console.log("error från src/trade.js: ", err);
                reject(err.message);
            }
            // console.log('req.body från db-function i src/trades.js: ', body);
            resolve(true);
        });
    });
}
