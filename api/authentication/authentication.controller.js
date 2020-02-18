const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.secretKey;

exports.login = (req, res) => {
    try {
        if(req.body.username === 'admin' && req.body.password === '123456') {
            let token = jwt.sign({ username: 'admin', role: 'admin' }, SECRET_KEY, { expiresIn: 60 * 60 });
            res.status(200).json({ username: 'admin', role: 'admin', token: token });
        } else {
           notAuthorized(res);
        }
    } catch(e) {
        notAuthorized(res);
    }
   
}

notAuthorized = res => {
    res.status(401).send("NOT FUCKING AUTHORIZED!");
}