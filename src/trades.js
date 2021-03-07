/**
 * Project jsramverk. Initially duplicate of reports.js.
 */

"use strict";

module.exports = {
    buyMushrooms: buyMushrooms,
    sellMushrooms: sellMushrooms
};


const sqliteDB = require("../db/database.js");


//  * Updates a specific entry in the users table. Is called from route '/buy' in routes/trade.js
// /**
//  * @async
//  * @returns void
//  */
function buyMushrooms(res, body) {
    return new Promise(function(resolve, reject) {
        // console.log("body från buyMushrooms in src/trades.js: ", body);

        let realTimePrice = body.realTimePrice,
            amount = body.amount,
            cost = realTimePrice * amount;

        // console.log("realTimePrice från src/trade.js: ", realTimePrice);
        // console.log("amount från src/trade.js: ", amount);
        // console.log("1cost från src/trade.js: ", cost);
        // console.log("2cost från src/trade.js: ", cost);
        // console.log("Katja från src/trade.js: ");

        let data = [cost, body.amount, body.email],
            sql;

        // console.log("data: ", data);

        if (body.mushroom === "Trattkantarell") {
            sql = `
                UPDATE users
                SET
                    liquid_assets = liquid_assets - ?,
                    amount_trattkantarell = amount_trattkantarell + ?
                WHERE email = ?`;
        } else if (body.mushroom === "Stensopp") {
            sql = `
                UPDATE users
                SET
                    liquid_assets = liquid_assets - ?,
                    amount_stensopp = amount_stensopp + ?
                WHERE email = ?`;
        }

        sqliteDB.run(sql, data, function(err) {
            // console.log("data: ", data);
            // console.log("data[1] ", data[1]);
            if (err) {
                // console.log("error från src/trade.js: ", err);
                reject(err.message);
            }
            // console.log('req.body från db-function i src/trades.js: ', body);
            resolve(true);
        });
        // console.log("Inifrån updateReport i src-fil");
    });
}


//  * Updates a specific entry in the users table. Is called from route '/sell' in routes/trade.js
// /**
//  * @async
//  * @returns void
//  */
function sellMushrooms(res, body) {
    return new Promise(function(resolve, reject) {
        // console.log("body från sellMushrooms in src/trades.js: ", body);

        let realTimePrice = body.realTimePrice,
            amount = body.amount,
            profit = realTimePrice * amount;

        // console.log("realTimePrice från src/trade.js: ", realTimePrice);
        // console.log("amount från src/trade.js: ", amount);
        // console.log("1cost från src/trade.js: ", profit);
        // console.log("2cost från src/trade.js: ", profit);
        // console.log("Katja från src/trade.js: ");

        let data = [profit, body.amount, body.email],
            sql;

        // console.log("data: ", data);

        if (body.mushroom === "Trattkantarell") {
            sql = `
                UPDATE users
                SET
                    liquid_assets = liquid_assets + ?,
                    amount_trattkantarell = amount_trattkantarell - ?
                WHERE email = ?`;
        } else if (body.mushroom === "Stensopp") {
            sql = `
                UPDATE users
                SET
                    liquid_assets = liquid_assets + ?,
                    amount_stensopp = amount_stensopp - ?
                WHERE email = ?`;
        }

        sqliteDB.run(sql, data, function(err) {
            // console.log("data: ", data);
            // console.log("data[1] ", data[1]);
            if (err) {
                // console.log("error från src/trade.js: ", err);
                reject(err.message);
            }

            resolve(true);
        });
        // console.log("Inifrån updateReport i src-fil");
    });
}
