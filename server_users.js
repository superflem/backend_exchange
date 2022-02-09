const express = require ('express');
const app = express();
const db = require('./database.js');

app.listen(9001); //i servizi degli utenti stanno sulla porta 9001

// signup(string email, string password, string name, string iban)
app.get('/signup', (req, res) => {
    const email = 'alex.caraffi@hotmail.it';
    const password = 'alexcaraffi';
    const nome = 'alex';
    const cognome = 'caraffi';
    const iban = 'H69K184LD94LD629105Y463728X';

    // questa query funziona
    //query = "INSERT INTO utente VALUES (DEFAULT, '"+nome+"', '"+cognome+"', '"+email+"', '"+password+"', '"+iban+"', 0, 0);"; //preparo la query di inserimento

    query = 'select * from utente';

    db.query(query, (err, res) => {
        if (err)
            console.log(err.message);
        else
            //console.log(res.rows);  //res.rows[1].id_utente
            console.log('Inserito correttamente');
    });
});

// deposit(number value, string symbol)  EUR o USD
app.get('/deposit', (req, res) => {
    const valore = 12;
    const simbolo = 'USD';
    const utente = 2;

    //faccio questa query per controllare di stare depositando meno soldi di quanto ne possa depositare
    if (simbolo == 'EUR')
        valuta = 'euro';
    else
        valuta = 'dollari';
    queryControllo = 'SELECT '+valuta+' AS soldi FROM utente WHERE id_utente = '+utente+';';

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
                queryModifica = 'UPDATE utente SET '+valuta+' = '+nuovoConto+' WHERE id_utente = '+utente+';';
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
