"use strict";
// File that contains an IIFE that runs when file is imported into another file.

// // Imports the sqlite3 module:
// const sqlite3 = require('sqlite3').verbose();
// // Creates a database object and opens the database connection automatically:
// const db1 = new sqlite3.Database('./db/texts.sqlite'); //eslint: unused variable


/**
 * Added 201028, not tested.
 * Tested and works.
*/
var sqlite3 = require('sqlite3').verbose();

module.exports = (function () {
    if (process.env.NODE_ENV === 'test') {
        let sqliteDbTest = new sqlite3.Database('./db/test.sqlite');

        return sqliteDbTest;
    }

    let sqliteDb = new sqlite3.Database('./db/texts.sqlite');

    return sqliteDb;
})();
/**
 * End added 201028, not tested.
 * Tested and works.
 */
