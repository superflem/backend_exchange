"use strict";
var Client = require('pg').Client;
var db = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'giuseppe-28',
    database: 'exchange_db'
});
db.connect(function (err) {
    if (err)
        console.log(err);
});
module.exports = db;
