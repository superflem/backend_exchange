declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('./database.js');

// deposit(nubmer value, string symbol)
router.get('/deposit', (req, res) => {
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

    //faccio questa query per capire quanti soldi ho nel conto
    const queryVecchio = 'SELECT '+valuta+' AS soldi FROM utente WHERE id_utente = '+utente+';';

    db.query(queryVecchio, (err, res) => {
        if (err)
            console.log(err);
        else
        {
            //aggiungo il valore appena trovato con quello in input
            const vecchio = res.rows[0].soldi;
            const nuovo = vecchio+valore;
            const queryAggiorna = 'UPDATE utente SET '+valuta+' = '+nuovo+' WHERE id_utente = '+utente+';';

            db.query(queryAggiorna, (err, res) => {
                if (err)
                    console.log(err.message);
                else
                    console.log('Conto caricato con successo');
            });
        }
    });
});

export = router;