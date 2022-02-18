declare function require(stringa:string);

function eseguiLogin(call, callback)
{
    const db = require('./database.js');
    const jwt = require('jsonwebtoken'); //JWT

    const email = call.request["email"];
    const password = call.request["password"];
    
    const risposta = {
        "isTuttoOk": false,
        "token": 'Errore sconosciuto',
        "utente": -1
    };

    const query = "SELECT * FROM utente WHERE email = '"+email+"' AND password = '"+password+"'";
    db.query(query, (err, res) => {
        if (err) //se c'è un errore nella query
        {
            console.log(err.message);
        }
        else
        {
            if (res.rows.length == 0) //se la lunghezza dei risultati è 0, vuol dire che non ho trovato una corrispondenza email password
            {
                risposta["token"] = 'Email o password errati';
                console.log('Email o password errati');
            }
            else //se trovo l'utente lo loggo
            {
                console.log('Utente trovato')
                console.log(res.rows);

                const accessToken = jwt.sign({id:res.rows.id_utente}, "chiaveSegreta", {expiresIn: "15m"}); //creo il token con la chiave "chiaveSegreta" che rimane valido per 15 min

                risposta["isTuttoOk"] = true;
                risposta["token"] = accessToken;
                risposta["utente"] = res.rows.id_utente;
            }
        }
        callback(null, risposta);
    });

    
}

export = eseguiLogin;