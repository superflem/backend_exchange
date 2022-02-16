declare function require(name:string);

const express = require ('express');
const app = express();

const bodyParser = require("body-parser"); //questo serve per leggere le rihieste post
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(80); //le api stanno in ascolto sulla porta 80

app.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
});