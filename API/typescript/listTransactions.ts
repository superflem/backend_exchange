require('typescript-require');

//GRPC
//come per il server, deve conoscere il pacchetto e i servizi
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("./proto/comunicazione.proto", {}); //gli passo il file proto per la comunicazione
const grpcObject = grpc.loadPackageDefinition(packageDef); //carico il package come oggetto
const comunicazionePackage = grpcObject.comunicazionePackage;

const client = new comunicazionePackage.ComunicazioneServer("localhost:9001", grpc.credentials.createInsecure()); //dico al client cn quale package devo comunicare e dove è il server

function listTransactions (req, response)
{
    let utente = req.cookies["utente"];
    utente = utente.replace('"', '');
    utente = utente.replace('"', '');

    const {valuta, data} = req.body;

    const invio = {
        "utente": utente,
        "valuta": valuta,
        "data": data
    };

    client.eseguiList(invio, (err, res) => {
        //console.log(res["isTuttoOk"]);
        response.status(200).json(JSON.stringify(res)); //rimando al client
    });
}

export = listTransactions;