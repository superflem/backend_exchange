declare function require(stringa:string);
const express = require('express');
const router = express.Router();
const db = require('../database.js');

// buy(number value, string symbol)
router.get('/buy', (req, res) => {
    const utente = 2;
    let quantita_spesa:number;
    let valuta: string;


    quantita_spesa = 2;
    valuta = 'USD';

    let valutaStringa:string;
    let valuta_comprata:string;
    let valuta_comprataStringa:string;

    //controllo sulla valuta
    if (valuta == 'USD')
    {
        valuta_comprata = 'EUR';
        valuta_comprataStringa = 'euro';
        valutaStringa = 'dollari';
    }
    else if (valuta == 'EUR')
    {
        valuta_comprata = 'USD';
        valuta_comprataStringa = 'dollari';
        valutaStringa = 'euro';
    }
    else
    {
        console.log('errore nella valuta');
        return;
    }

    // controllo sulla quantita
    if (quantita_spesa <= 0)
    {
        console.log('errore nella quantità');
        return;
    }

    
    const queryControllo = 'SELECT '+valutaStringa+' AS soldi FROM utente WHERE id_utente = '+utente+";";

    db.query(queryControllo, (err, res) => { //controllo di avere abbastanza soldi
        if (err)
        {
            console.log(err.message);
        }
        else
        {
            if (quantita_spesa > res.rows[0].soldi)
            {
                console.log('non hai abbastanza denaro');
            }
            else
            {
                
                const soldiIniziali = res.rows[0].soldi;
                const soldiFinali = soldiIniziali - quantita_spesa;
                let quantita_comprata: number;

                //INTERROGO IL SERVIZIO PER IL CAMBIO
                quantita_comprata = 3;

                const queryComprata = 'SELECT '+valuta_comprataStringa+' AS soldi FROM utente WHERE id_utente = '+utente+";";
                db.query(queryComprata, (err, res) => { //guardo quanti solldi dell'altra valuta ho
                    if (err)
                    {
                        console.log(err.message);
                    }
                    else
                    {
                        const vecchiComprati = res.rows[0].soldi;
                        const soldiFinaliComprati = vecchiComprati + quantita_comprata;

                        let queryAggiornamento = 'UPDATE utente SET '+valutaStringa+' = '+soldiFinali+', '+valuta_comprataStringa+' = '+soldiFinaliComprati;
                        queryAggiornamento = queryAggiornamento + ' WHERE id_utente = '+utente+";";

                        db.query(queryAggiornamento, (err, res) => { //aggiorno i valori nel database
                            if (err)
                                console.log('pippo '+err.message);
                            else
                            {
                                const data = new Date(); //calcolo la data e la metto nel formato corretto
                                const anno = data.getFullYear();
                                let mese:string;
                                if (data.getMonth()+1 < 10)
                                {
                                    const mesee = data.getMonth()+1;
                                    mese = '0'+mesee;
                                }
                                else
                                {
                                    const mesee = data.getMonth()+1;
                                    mese = ''+mesee;
                                }
                                let giorno:string;
                                if (data.getDate() < 10)
                                {
                                    giorno = '0'+data.getDate();
                                }
                                else
                                {
                                    giorno = ''+data.getDate();
                                }
                                const dataStringa = anno+'-'+mese+'-'+giorno;

                                let queryInserimento = "INSERT INTO transizione VALUES (default, "+utente+", "+quantita_spesa+", "+quantita_comprata+", '"+valuta_comprata+"', '";
                                queryInserimento = queryInserimento + dataStringa + "');";

                                db.query(queryInserimento, (err, res) => { //inserisco nella tabella transizione
                                    if (err)
                                        console.log(err.message);
                                    else
                                        console.log('tutto ok');
                                })
                            }
                        });
                    }

                });
                

            }
        }
    });


});

export = router;