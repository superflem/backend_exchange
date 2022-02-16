declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('./database.js');

//ottengo gli euro e i dollari di un determinato utente dato dalla email
router.get('/query', (req, res) => {
    const email = 'giulio.cesare@gmail.com';

    const query = "SELECT dollari, euro FROM utente WHERE email = '"+email+"';";

    db.query(query, (err, res) => {
        if (err)
            console.log(err.message);
        else
        {
            console.log(res.rows);
        }
    });
});
export = router;