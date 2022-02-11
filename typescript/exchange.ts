declare function require(stringa:string);
const https = require('https');
const url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?46f0dd7988932599cb1bcac79a10a16a"; //link della BCE
//const url = 'http://www.ecb.int/vocabulary/2002-08-01/eurofxref';
let data: string;
data = '';

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

            const cambio = json['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'][0]['$']['rate'];  //ottengo il cambio euro dollari
            console.log(cambio);// primo tag   => primo cube => cube time => primo oggetto cube => rate
        });
        

    });
}).on('error', err => {
  console.log(err.message);
});
