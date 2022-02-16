declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('./database.js');

// login(string email, string password)
router.get('/login', (req, res) => {
    const email = 'giulio.cesare@gmail.com';
    const password = 'giuliocesare';

    const query = "SELECT * FROM utente WHERE email = '"+email+"' AND password = '"+password+"'";
    db.query(query, (err, res) => {
        if (err) //se c'è un errore nella query
            console.log(err.message);
        else
        {
            if (res.rows.length == 0) //se la lunghezza dei risultati è 0, vuol dire che non ho trovato una corrispondenza email password
                console.log('Email o password errati');
            else //se trovo l'utente lo loggo
            {
                console.log(res.rows);
            }
        }
    });

});

export = router;