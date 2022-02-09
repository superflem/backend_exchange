declare function require(name:string);

const express = require ('express');
const app = express();
const db = require('./database.js');

app.listen(9001); //i servizi degli utenti stanno sulla porta 9001

// signup(string email, string password, string name, string iban)
const signup = require('./routes/signup.js');
app.use(signup);

// withdraw(number value, string symbol)  EUR o USD
const withdraw = require('./routes/withdraw.js');
app.use(withdraw);

// deposit(nubmer value, string symbol)
const deposit = require('./routes/deposit.js');
app.use(deposit);