const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.secretKey;

exports.isLoggedin = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        let decoded = jwt.verify(token, SECRET_KEY);
        if (decoded) {
            req.body['user'] = decoded;
            next();
        } else {
            notAuthorized(res);
        }
    } catch(e) {
        notAuthorized(res);
    }

}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.body.user.role === 'admin') {
            next();
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