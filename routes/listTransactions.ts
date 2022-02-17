declare function require(stringa:string);

function eseguiList (call, callback)
{
    const db = require('./database.js');
    
    const utente = call.request["utente"];
    const valuta = call.request["valuta"];
    const data = call.request["data"];

    const risposta = {
        "isTuttoOk": false,
        "messaggio": "",
        "listaTransizioni": ""
    }

    let query:string;
    query = 'SELECT quantita_spesa, quantita_comprata, valuta_comprata, data FROM transizione WHERE fk_utente = '+utente;

    if (valuta)  //filtro per valuta (se c'è)
    {
        if (valuta != 'USD' && valuta != 'EUR')
        {
            risposta["messaggio"] = 'Valuta sbagliata';
            callback(null, risposta);
            return;
        }
        else
            query = query + " AND valuta_comprata = '"+valuta+"'";
    }

    if (data) //filtro per data (se c'è)
    {
        query = query + " AND data = '"+data+"'";
    }

    db.query(query, (err, res) =>{
        if (err) //errore nella query
        {
            risposta["messaggio"] = err.message;
            callback(null, risposta);
        }
        else
        {
            if (res.rows.length == 0) //controllo di aver trovato l'utente
            {
                risposta["messaggio"] = "utente non trovato";
                console.log("ciao");
                callback(null, risposta);
            }
            else //se è andato tutto bene
            {
                risposta["messaggio"] = "tutto ok";
                risposta["isTuttoOk"] = true;

                /*
                const lista = [];

                const oggetto = {
                    "quantitaSpesa": 0,
                    "quantitaComprata": 0,
                    "valutaComprata": 'USD',
                    "data": '2022-01-01'
                }

                for (let i = 0; i < res.rows.length; i++)
                {
                    oggetto["quantitaSpesa"] = res.rows[i].quantita_spesa;
                    oggetto["quantitaComprata"] = res.rows[i].quantita_comprata;
                    oggetto["valutaComprata"] = res.rows[i].valuta_comprata;
                    oggetto["data"] = res.rows[i].data;

                    lista.push(oggetto);
                }
                */

                risposta["listaTransizioni"] = JSON.stringify(res.rows);
                callback(null, risposta);
                //console.log(res.rows);
            } 
        }
    });
}

export = eseguiList;