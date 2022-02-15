declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('./database.js');

// signup(string email, string password, string name, string iban)
router.get('/signup', (req, res) => {
    const email = 'daniela.campioli@hotmail.com';
    const password = 'danielacampioli';
    const nome = 'daniela';
    const cognome = 'campioli';
    const iban = 'H69K184UD94LD629105Y763728X';

    // questa query funziona
    let query = "INSERT INTO utente VALUES (DEFAULT, '"+nome+"', '"+cognome+"', '"+email+"', '"+password+"', '"+iban+"', 0, 0);"; //preparo la query di inserimento

    //query = 'select * from utente';

    db.query(query, (err, res) => {
        if (err)
            console.log(err.message);
        else
            //console.log(res.rows);  //res.rows[1].id_utente
            console.log('Inserito correttamente');
    });
});

export = router;