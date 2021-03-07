"use strict";

module.exports = {

    getUser: getUser,
    checkToken: checkToken
};

const jwt = require('jsonwebtoken');

let config;

try {
    config = require('../config/config.js');
} catch (error) {
    console.error(error);
}

const jwtSecret = config.jwtSecret;
// const jwtSecret = process.env.JWT_SECRET || config.jwtSecret;

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



//  * Gets a user from the user table.
// /**
//  * @async
//  * @returns void
//  */
function getUser(res, body) {
// function getUser(res, body, status=200) {
    return new Promise(function(resolve, reject) {
        let email = body.email;

        let sql = `
                SELECT ROWID as id, email, password
                FROM users
                WHERE email = ?`;

        sqliteDB.get(sql, email, function(err, row) {
            if (err) {
                // console.log("err.message från src/login.js: ", err.mesage);
                // console.log("err från src/login.js: ", err);
                reject(err.message);
            } else if (row === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "User not found",
                        detail: "User with provided email not found."
                    }
                });
            } else {
                resolve(row);
                // console.log(`Row updated: ${this.changes}`);
                // returns true to src-file:
                // resolve(true);
                // returns a statement to src-file:
                // resolve(this);
                // console.log(`Row updated: ${this.changes}`);
            }
        });
        // console.log("body.email från src-filen: ", body.email);
        // console.log("hashedPassedWord från src-filen: ", hashedPassedWord);
        // console.log("Inifrån updateReport i src-fil");
    });
}


function checkToken(req, res, next) {
    var token = req.headers['authorization'];

    // console.log("token från src-filen login.js: ", token);

    if (token) {
        // jwt.verify(token, jwtSecret, function(err, decoded) {
        jwt.verify(token, jwtSecret, function(err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: req.path,
                        title: "Failed authentication",
                        detail: err.message
                    }
                });
            }

            // console.log("decoded från src login.js", decoded);
            // console.log("decoded email från src login.js", decoded.email);
            // console.log("decoded expiresAt från src login.js", decoded.exp);

            next();

            return undefined;
        });
    } else {
        return res.status(401).json({
            errors: {
                status: 401,
                source: req.path,
                title: "No token",
                detail: "No token provided in request headers"
            }
        });
    }
}
