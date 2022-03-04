require('typescript-require');
require('dotenv').config({ path: __dirname+'/./../.env'}); //prendo le informazio del database nel file .env
const {Client} = require('pg');

const db = new Client ({
    host: process.env.HOST,
    user: process.env.UTENTE,
    port: process.env.PORT, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



db.connect(err => {
    if (err)
        console.log(err);
});


export = db;