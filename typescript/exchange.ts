declare function require(name:string);

const express = require ('express');
const app = express();

app.listen(9000); //il servizio dello scambio sta in ascolto sulla porta 9001

app.get('/', (req, res) => { //contatto il server per ottenere il cambio euro dollaro e viceversa
   

    const utente = 2;
    let from:string;
    let to:string;
    let verso:number;

    from = 'EUR';
    to = 'USD';
    const quantita_spesa = 3;

    //controllo sul giusto cambio
    if (from == 'USD' && to == 'EUR')
    {
        verso = 1; //da dollari a euro
    }
    else if (to == 'USD' && from == 'EUR')
    {
        verso = 2;//da euro a dollari
    }
    else
    {
        console.log('errore nel cambio');
        return;
    }

    //controllo sulla quota
    if (quantita_spesa <= 0)
    {
        console.log('errore nella quota');
        return;
    }

    //leggo il file xml della bce    
    const https = require('https');
    const url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?46f0dd7988932599cb1bcac79a10a16a"; //link della BCE
    let data: string;
    data = ''; //i dati che vengono presi dal file xml
    let cambio:number;

    https.get(url, res => {
        res.on('data', chunk => 
        {
            data += chunk; //legge riga per riga il file
        });
        res.on('end', () => { //viene trasformato in un formato stringa leggibile e stampato
            //console.log(data);

            
            const xml2js = require ('xml2js');
            const parser = new xml2js.Parser(); 

            parser.parseString(data, (err, res) => { //trasformo la stringa in codice json
                const stringaJson = JSON.stringify(res); //ottengo una stringa json

                const json = JSON.parse(stringaJson);  //trasformo la stringa in un oggetto json

                //const cambio = json['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'][0]['$']['rate'];  //ottengo il cambio euro dollari
                //console.log(cambio);// primo tag   => primo cube => cube time => primo oggetto cube => rate

                const cambiValute = json['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'];
                let trovato = false; //serve per verificare di aver torvato il valore corrispondente, nel caso restituisce undefined
                for (let i = 0; i < cambiValute.length; i++)
                {
                    if (cambiValute[i]['$']['currency'] == 'USD')
                    {
                        cambio = cambiValute[i]['$']['rate'];
                        trovato = true;
                        break;
                    }
                }

                //console.log('dentro la funzione '+cambio);  
                if (trovato)     
                    return cambio;
                else
                    return undefined;
            });    
        });
    }).on('error', err => {
        console.log(err.message);
    });

    


























 
    //aspetto che il file venga letto del tutto per poi fare la richiesta al database
    setTimeout(() => 
    {
        if (!cambio)
        {
            console.log('Errore nella lettura del file xml');
            return;
        }

        let quantita_comprata:number;
        //euro : dollari = 1 : cambio
        if (verso == 1) //da dollari ad euro
        {
            quantita_comprata = quantita_spesa / cambio;
        }
        else //da euro a dollari
        {
            quantita_comprata = quantita_spesa * cambio;
        }

        console.log(quantita_comprata);

    }, 5000);
    

});
