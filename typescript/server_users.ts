declare function require(name:string);

const express = require ('express');
const app = express();
const db = require('./database.js');

app.listen(9001); //i servizi degli utenti stanno sulla porta 9001

// signup(string email, string password, string name, string iban)
const signup = require('./signup.js');
app.use(signup);

// withdraw(number value, string symbol)  EUR o USD
const withdraw = require('./withdraw.js');
app.use(withdraw);

// deposit(nubmer value, string symbol)
const deposit = require('./deposit.js');
app.use(deposit);

// listTransactions(object filter)
const listTransactions = require('./listTransactions.js');
app.use(listTransactions);

//buy(number value, string symbol)
const buy = require('./buy.js');
app.use(buy);

//login(string email, string password)
const login = require('./login.js');
app.use(login);

//query
const query = require('./query.js');
app.use(query);