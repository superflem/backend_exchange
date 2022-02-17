declare function require(name:string);

const express = require ('express');
const app = express();
app.use(express.json());

const jwt = require('jsonwebtoken'); //JWT (qua faccio la verifica dei token)

//GRPC
//come per il server, deve conoscere il pacchetto e i servizi
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("./proto/comunicazione.proto", {}); //gli passo il file proto per la comunicazione
const grpcObject = grpc.loadPackageDefinition(packageDef); //carico il package come oggetto
const comunicazionePackage = grpcObject.comunicazionePackage;

const client = new comunicazionePackage.ComunicazioneServer("localhost:9001", grpc.credentials.createInsecure()); //dico al client cn quale package devo comunicare e dove è il server

app.listen(80); //le api stanno in ascolto sulla porta 80

//LOGIN
app.post('/login', (req, res) => { //quando qualcuno fa la richiesta di login, lo reindirizzo al server user che crea il token jwt e lo rimando
    const {email, password} = req.body;

    const invio = {
        "email": email,
        "password": password
    }
    client.eseguiLogin(invio, (err, res) => {
        console.log('sono rientrato');

        console.log(res["token"]);
      
    });
});

//DEPOSITO
app.post('/deposit', verifica, (req, res) => {
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
app.post('/withdraw', verifica, (req, res) => {
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
app.post('/query', verifica, (req, res) => {
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

//SIGNUP
app.post('/signup', verifica, (req, res) => {
    const {email, password, nome, cognome, iban} = req.body;

    const invio = {
        "email": email,
        "password": password,
        "nome": nome,
        "cognome": cognome,
        "iban": iban
    };

    client.eseguiSignup(invio, (err, res) => {
        console.log(res["messaggio"]);
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
                req.email = user;
                next();
            }
        });
    }
    else
    {
        res.status(401).json('non sei autenticato');
    }
}


app.post('/ciccio', verifica, (req, res) => { //cosa a caso per verificare il token
    res.json('hai superato la verifica: '+req.email);
})