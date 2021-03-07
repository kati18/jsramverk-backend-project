/**
 * Project jsramverk. Initially duplicate of reports.js.
 */
"use strict";

module.exports = {

    getAccount: getAccount,
    updateAccount: updateAccount
};


const sqliteDB = require("../db/database.js");


//  * Shows specific entry in the users table.
// /**
//  * @async
//  * @returns void
//  */
function getAccount(req, res, eMail) {
    return new Promise(function(resolve, reject) {
        let sql = `
                SELECT email, liquid_assets, amount_trattkantarell, amount_stensopp
                FROM users
                WHERE email = ? `;

        // sqliteDB.all(sql, (err, rows) => {
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
        sqliteDB.get(sql, eMail, function(err, row) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                reject(err.message);
            } else if (row === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/accounts/" + eMail,
                        title: "Account not found",
                        detail: "Account with provided email not found."
                    }
                });
            }

            // console.log("row från src/account.js: ", row);
            resolve(row);
        });
    });
}

//  * Updates a specific entry in the users table.
// /**
//  * @async
//  * @returns void
//  */
function updateAccount(res, body) {
    return new Promise(function(resolve, reject) {
        let data = [body.deposit, body.email];

        let sql = `
                UPDATE users
                SET
                    liquid_assets = liquid_assets + ?
                WHERE email = ?`;

        sqliteDB.run(sql, data, function(err) {
            // console.log("data[1] ", data[1]);
            if (err) {
                reject(err.message);
            }
            resolve(true);
        });
    });
}
