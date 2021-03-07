"use strict";

module.exports = {

    addUser: addUser
};

// const sqlite3 = require('sqlite3').verbose();
//
// let sqliteDB;
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


//  * Adds a user to the user table.
// /**
//  * @async
//  * @returns void
//  */
function addUser(res, body, hashedPassWord) {
// function addUser(res, body, hashedPassedWord, status=201) {
    return new Promise(function(resolve, reject) {
        let data = [body.email, hashedPassWord];

        let sql = `
                INSERT INTO users
                (email, password) VALUES (?, ?)`;

        sqliteDB.run(sql, data, function(err) {
            // err if table user doesn´t exist or user already exists:
            if (err) {
                // console.log("err.message från src/register.js: ", err.message);
                reject(err.message);
            } else {
                // console.log(`Row updated: ${this.changes}`);
                // returns true to src-file:
                resolve(true);
                // returns a statement to src-file:
                // resolve(this);
            }

            // console.log(`Row updated: ${this.changes}`);
        });
        // console.log("body.email från src-filen: ", body.email);
        // console.log("hashedPassedWord från src-filen: ", hashedPassedWord);
        // console.log("Inifrån updateReport i src-fil");
    });
}
