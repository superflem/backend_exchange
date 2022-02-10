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
    res.on('end', () => { //viene trasformato in un formato leggibile e stampato
        console.log(data);
    })
}).on('error', err => {
  console.log(err.message);
});
