declare function require(name:string);

const express = require ('express');
const cookieParser = require('cookie-parser'); //permette di leggere i cookie
const jwt = require('jsonwebtoken'); //JWT (qua faccio la verifica dei token)
const cors = require('cors');

const app = express(); //creo l'applicativo di express

app.use(cookieParser()); //uso i cookie

const corsOption = {
    origin: "http://imac-di-mauro.lan:3000",
    credentials: true
};
app.use(cors(corsOption)); //dico che va bene quello che arriva da qualsiasi parte

const bodyParser = require('body-parser') //per parsare il body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//GRPC
//come per il server, deve conoscere il pacchetto e i servizi
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("./proto/comunicazione.proto", {}); //gli passo il file proto per la comunicazione
const grpcObject = grpc.loadPackageDefinition(packageDef); //carico il package come oggetto
const comunicazionePackage = grpcObject.comunicazionePackage;

const client = new comunicazionePackage.ComunicazioneServer("localhost:9001", grpc.credentials.createInsecure()); //dico al client cn quale package devo comunicare e dove è il server

app.listen(80); //le api stanno in ascolto sulla porta 80

//let tokenValidi = [];

//VERIFICO IL TOKEN
//app.post('/verifica', require('./verifica.js'));

//LOGIN
app.post('/login', require('./login.js'));

//DEPOSITO
app.post('/deposit', require('./verifica.js'), (req, res) => {
    const {utente, valore, simbolo} = req.body;

    const invio = {
        "utente": utente,
        "valore": valore,
        "simbolo": simbolo
    }

    client.eseguiDeposito(invio, (err, res) => {
        console.log(res["messaggio"]);
    });
});

//WITHDRAW
app.post('/withdraw', require('./verifica.js'), (req, res) => {
    const {utente, valore, simbolo} = req.body;

    const invio = {
        "utente": utente,
        "valore": valore,
        "simbolo": simbolo
    }

    client.eseguiWithdraw(invio, (err, res) => {
        console.log(res["messaggio"]);
    });
});

//QUERY
app.post('/query', require('./verifica.js'), require('./query.js'));
/*
app.post('/query', require('./verifica.js'), (req, res) => {
    const {utente} = req.body;

    const invio = {
        "utente": utente
    };

    client.eseguiQuery(invio, (err, res) => {
        if (res["isTuttoOk"])
        {
            console.log('dollari: '+res['dollari']);
            console.log('euro: '+res['euro']);
        }
        else
        {
            console.log('errore inatteso');
        }
    });
});
*/

//SIGNUP
app.post('/signup', require('./signup.js'));

//BUY
app.post('/buy', require('./verifica.js'), (req, res) => {
    const {utente, quantita_spesa, valuta} = req.body;

    const invio = {
        "utente": utente,
        "quantitaSpesa": quantita_spesa.toFixed(2),
        "valuta": valuta
    };

    client.eseguiBuy(invio, (err, res) => {
        console.log(res["messaggio"]);
    });
    
});

//LIST TRANSACTIONS
app.post('/listTransactions', require('./verifica.js'), (req, res) => {
    const {utente, valuta, data} = req.body;

    const invio = {
        "utente": utente,
        "valuta": valuta,
        "data": data
    };

    client.eseguiList(invio, (err, res) => {
        console.log(res["messaggio"]);

        //traduco da stringa a json se non ci sono errori
        if (res["isTuttoOk"])
        {
            /*
            const oggettoJson = JSON.parse(res["listaTransizioni"]);
            console.log(oggettoJson[0]["quantita_spesa"]);
            */
           console.log(JSON.parse(res["listaTransizioni"]));
        }
    });
});

//LOGOUT
/*
app.post("/logout", verifica, (req, res) => {
    const token = req.headers.token; //passo il token nel body della richiesta

    tokenValidi = tokenValidi.filter((tokenInterni) => tokenInterni !== token); //tolgo il token

    res.status(200).json("logout effettuato"); //restituisco il nuovo token
});
*/

/*
//REFRESH DEL TOKEN
app.post("/refresh", (req, res) => {
    const vecchioToken = req.headers.token; //passo il token nel body della richiesta

    if (!vecchioToken)
        return res.status(401).json("non sei autenticato"); //se non cè il token
    
    if (!tokenValidi.includes(vecchioToken)) //se non è tra i token validi
        return res.status(403).json('token non valido');


    jwt.verify(vecchioToken, "chiaveSegreta", (err, user) => {
        if (err)
            return res.status(403).json('token non valido'); //il token è scaduto

        //se il token è ancora valido ne creo uno nuovo e invalido quello vecchio
        const nuovoToken = jwt.sign({id:user.id}, "chiaveSegreta", {expiresIn: "15m"});

        tokenValidi = tokenValidi.filter((tokenInterni) => tokenInterni !== vecchioToken); //tolgo il vecchio token
        tokenValidi.push(nuovoToken); //inserisco il nuovo token

        res.status(200).json({"nuovoToken": nuovoToken}); //restituisco il nuovo token
    });
});




function verifica (req, res, next)
{
    const token = req.headers.token; //il JWT lo metto nell'header della richiesta http e in questo mondo lo leggo
    if (token) //controllo che il token sia presente
    {
        jwt.verify (token, "chiaveSegreta", (err, user) => { //controllo che il token sia valido
            if (err) //controllo che il token sia valido
            {
                return res.status(403).json('token non valido');
            }
            else //se è tutto ok, setto la mail e vado avanti
            {
                if (!tokenValidi.includes(token)) //se non è tra i token validi
                    return res.status(403).json('token non valido');
                
                req.user = user;
                next();
            }
        });
    }
    else
    {
        res.status(401).json('non sei autenticato');
    }
}


//toglie i token scaduti da tokenValidi
function cancellaToken()
{
    for (let i = 0; i < tokenValidi.length; i++)
    {
        jwt.verify(tokenValidi[i], "chiaveSegreta", (err, user) => {
            if (err)
            {
                tokenValidi = tokenValidi.filter((tokenInterni) => tokenInterni !== tokenValidi[i]); //tolgo il token scaduto
                i = i-2;
            }
        });
    }
}

setInterval(cancellaToken, 900000); //ogni 15 minuti, tolgo i token scaduti da tokenValidi

*/




/*
app.get("/ciao", (req, res) => {
    res.cookie('nome', 'negro', {secure: true, sameSite: "none"});
    res.json("arrivati i biscotti2");
});
*/


app.get("/ciaoo", (req, res) => {
    console.log(req.cookies["jwt"]+" "+req.cookies["utente"]);
    res.json(req.cookies["jwt"]+" "+req.cookies["utente"]);
});


