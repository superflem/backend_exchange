Il file database.ts effettua una connessione al database e restituisce la variabile db che permetterà di eseguire delle query
Il file server_users.ts crea un server in ascolto sulla porta 9001 che esegue i servizi dell'utente come signup, deposit eccetera
Il file api.ts crea un server in ascolto sulla porta 80 che riceve le richieste da internet e le smista nei giusti server

Per compilare i file typescript, dal terminale lanciare ./make.bh dentro la cartella backend_exchange
Per startare i server eseguire node build/server_users e (su un altro terminale) node build/exchange (sempre nella cartella backend_exchange)