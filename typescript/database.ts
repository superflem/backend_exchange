require('typescript-require');
const {Client} = require('pg');



const db = new Client ({
    host: 'localhost',
    user: 'postgres',
    port: 5432, //questa è la porta di default di postres
    password: 'giuseppe-28',
    database: 'exchange_db'
});



db.connect(err => {
    if (err)
        console.log(err);
});


export = db;