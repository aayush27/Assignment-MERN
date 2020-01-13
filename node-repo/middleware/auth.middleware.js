const jwt = require('jsonwebtoken');

exports.tokenValidator = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).json({ error: 'Token is compulsory'});
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (decoded) {
            next();
        } else {
            res.status(400).json({ error: 'Invalid Token'});
        }
    });
}