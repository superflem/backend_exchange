declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('../database.js');

// listTransactions(object filter)
router.get('/listTransactions', (req, res) => {
    const utente = 2;
    let valuta:string;
    let query:string;
    let data:string;

    //valuta = 'USD';
    data = '2022-01-18';

    query = 'SELECT * FROM transizione WHERE fk_utente = '+utente;

    if (valuta)  //filtro per valuta (se c'è)
    {
        if (valuta != 'USD' && valuta != 'EUR')
            console.log('Valuta sbagliata');
        else
            query = query + " AND valuta_comprata = '"+valuta+"'";
    }

    if (data)
    {
        query = query + " AND data = '"+data+"'";
    }

    db.query(query, (err, res) =>{
        if (err)
            console.log(err.message);
        else
            console.log(res.rows);
    });
});

export = router;