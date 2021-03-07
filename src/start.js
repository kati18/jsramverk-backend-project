/**
 * Project jsramverk. Initially duplicate of me.js.
 */
"use strict";

module.exports = {

    getStart: getStart
};


// const sqlite3 = require('sqlite3').verbose();
//
// let sqliteDB;
//
//
// /**
// * Main function
// * @async
// * @returns void
// */
// (async function() {
//     sqliteDB = await new sqlite3.Database('./db/texts.sqlite');
//
//     process.on("exit", () => {
//         sqliteDB.close();
//     });
// })();

const sqliteDB = require("../db/database.js");



function getStart(res) {
    /** Below creates a Promise that is responsible for executing a database query,
     * asynchronous code is surrounded by a Promise in order to get sequential code
     * execution
     */
    return new Promise(function (resolve, reject) { // alt.:
    // return new Promise((resolve) => {
        sqliteDB.all("SELECT * FROM start", function(err, rows) { // alt.:
        // sqliteDB.all("SELECT * FROM me", (err, rows) => {
            if (err) {
                // res.status(500).json({
                //     errors: {
                //         status: 500,
                //         source: "/",
                //         title: "Database error",
                //         detail: err.message
                //     }
                // });
                reject(err.message);
            } else if (rows.length == 0) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/",
                        title: "Info not found",
                        // detail: "Info about me not found."
                        detail: "Info about start not found."
                    }
                });
            } else {
                resolve(rows);
            }
        });
    });
}
