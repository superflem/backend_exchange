declare function require(stringa:string);


function query (call, callback)
{
    const db = require('./database.js');
    const utente = call.request["utente"];

    const invio = {
        "isTuttoOk": false,
        "euro": 0,
        "dollari": 0
    };

    const query = "SELECT dollari, euro FROM utente WHERE id_utente = '"+utente+"';";

    db.query(query, (err, res) => {
        if (err) //controllo degli errori nella query
        {
            callback(null, invio);
        }
        else
        {
            if (res.rows.length == 0) //controllo di aver trovato l'utente
            {
                invio["messaggio"] = 'utente non trovato';
                callback(null, invio);
            }
            else //se tutto ok
            {
                invio["euro"] = res.rows[0].euro;
                invio["dollari"] = res.rows[0].dollari;
                invio["isTuttoOk"] = true;

                callback(null, invio);
            }
        }
    });
}

export = query;