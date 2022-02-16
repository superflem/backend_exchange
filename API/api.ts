declare function require(name:string);

const express = require ('express');
const app = express();
app.use(express.json());

const jwt = require('jsonwebtoken'); //JWT

//const bodyParser = require("body-parser"); //questo serve per leggere le rihieste post
//app.use(bodyParser.urlencoded({ extended: false }));

app.listen(80); //le api stanno in ascolto sulla porta 80

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    //res.json(email+' '+password);
    //console.log(email,password);
    
    //genero il token
    const accessToken = jwt.sign({id:email}, "chiaveSegreta"); //creo il token con la chiave "chiaveSegreta"
    res.json({
        email: email,
        accessToken
    }); //invio al client il nome utente e il token
    
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