declare function require(s: string);
const jwt = require('jsonwebtoken');

function verifica (req, res)
{
    const token = req.cookies["jwt"];
    //console.log(token);
    let invio = {
        autenticato: false
    };
    
    if (token)
    {
        jwt.verify(token, "chiaveSegreta", (err, user) => {
            if (!err)
            {
                invio["autenticato"] = true;
                
            }
            console.log('token: '+token);
        })
    }
    res.json(invio)
}

export = verifica;