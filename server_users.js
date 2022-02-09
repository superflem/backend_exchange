var express = require('express');
var app = express();
var db = require('./database.js');
app.listen(9001); //i servizi degli utenti stanno sulla porta 9001
// signup(string email, string password, string name, string iban)
var signup = require('./routes/signup.js');
app.use(signup);
// withdraw(number value, string symbol)  EUR o USD
var withdraw = require('./routes/withdraw.js');
app.use(withdraw);
// deposit(nubmer value, string symbol)
var deposit = require('./routes/deposit.js');
app.use(deposit);
