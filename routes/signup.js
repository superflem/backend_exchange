const express = require('express');
const router = express.Router();
const db = require('../database.js');

// signup(string email, string password, string name, string iban)
router.get('/signup', (req, res) => {
    const email = 'alex.caraffi@hotmail.it';
    const password = 'alexcaraffi';
    const nome = 'alex';
    const cognome = 'caraffi';
    const iban = 'H69K184LD94LD629105Y463728X';

    // questa query funziona
    query = "INSERT INTO utente VALUES (DEFAULT, '"+nome+"', '"+cognome+"', '"+email+"', '"+password+"', '"+iban+"', 0, 0);"; //preparo la query di inserimento

    //query = 'select * from utente';

    db.query(query, (err, res) => {
        if (err)
            console.log(err.message);
        else
            //console.log(res.rows);  //res.rows[1].id_utente
            console.log('Inserito correttamente');
    });
});

module.exports = router;