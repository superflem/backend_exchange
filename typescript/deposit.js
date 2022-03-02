"use strict";
require('typescript-require');
function deposit(call, callback) {
    var db = require('./database.js');
    var risposta = {
        "isTuttoOk": false,
        "messaggio": 'errore sconosciuto'
    };
    var valore = Number(call.request["valore"]);
    var utente = call.request["utente"];
    var simbolo = call.request["simbolo"];
    var valuta;
    //controllo la valuta
    if (simbolo == 'EUR')
        valuta = 'euro';
    else if (simbolo == 'USD')
        valuta = 'dollari';
    else {
        //console.log('Valuta errata');
        risposta["messaggio"] = 'valuta errata';
        callback(null, risposta);
    }
    //controllo che il valore non sia negativo
    if (valore <= 0) {
        //console.log('Il valore è negativo')
        risposta["messaggio"] = 'Il valore è negativo';
        callback(null, risposta);
    }
    //faccio questa query per capire quanti soldi ho nel conto
    var queryVecchio = 'SELECT ' + valuta + ' AS soldi FROM utente WHERE id_utente = ' + utente + ';';
    db.query(queryVecchio, function (err, res) {
        if (err) //controllo gli errori nella prima select
         {
            risposta["messaggio"] = err.message;
            callback(null, risposta);
        }
        else {
            if (res.rows.length == 0) //controllo di aver trovato l'utente
             {
                risposta["messaggio"] = "utente non trovato";
                callback(null, risposta);
            }
            else {
                //aggiungo il valore appena trovato con quello in input
                var vecchio = Number(res.rows[0].soldi);
                var nuovo = Number(vecchio + valore);
                var queryAggiorna = 'UPDATE utente SET ' + valuta + ' = ' + nuovo + ' WHERE id_utente = ' + utente + ';';
                db.query(queryAggiorna, function (err, res) {
                    if (err) {
                        risposta["messaggio"] = err.message;
                        callback(null, risposta);
                    }
                    else {
                        risposta["messaggio"] = "conto caricato con successo";
                        risposta["isTuttoOk"] = true;
                        callback(null, risposta);
                    }
                });
            }
        }
    });
}
module.exports = deposit;
