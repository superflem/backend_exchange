declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('../database.js');

// withdraw(number value, string symbol)  EUR o USD
router.get('/withdraw', (req, res) => {
    const valore = 12;
    const utente = 2;
    let simbolo = 'USD';
    let valuta:string;

    //controllo la valuta
    if (simbolo == 'EUR')
        valuta = 'euro';
    else if (simbolo == 'USD')
        valuta = 'dollari';
    else
    {
        console.log('Valuta errata');
        return;
    }

    //controllo che il valore non sia negativo
    if (valore <= 0)
    {
        console.log('Il valore è negativo')
        return;
    }

    //faccio questa query per controllare di stare depositando meno soldi di quanto ne possa depositare
    const queryControllo = 'SELECT '+valuta+' AS soldi FROM utente WHERE id_utente = '+utente+';';

    //prima controllo che la somma da depositare sia inferiore dalla somma presente nel database
    db.query(queryControllo, (err, res) => {
        if (err)
            console.log(err.message);
        else
        {
            const vecchioConto = res.rows[0].soldi;
            if (valore > vecchioConto)  //controllo di avere abbastanza soldi
                console.log('Hai meno soldi di quelli che vorresti depositare');
            else //se ho abbastanza soldi, calcolo il nuovo valore e aggiorno il database
            {
                const nuovoConto = vecchioConto - valore;
                const queryModifica = 'UPDATE utente SET '+valuta+' = '+nuovoConto+' WHERE id_utente = '+utente+';';
                db.query(queryModifica, (err, res) => {
                    if (err)
                        console.log(err.message);
                    else
                        console.log('Deposito avvenuto con successo');
                });
            }
        }
    });
});

export = router;