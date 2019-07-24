const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'THIS IS A REALLY LONG SECRET', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ you: 'can\'t touch this' });
            } else {
                req.decodedToken = decodedToken;
                console.log('decoded token', req.decodedToken);
                
                next();
            }
        });
    } else {
        res.status(401).json({ you: 'SHALL NOT PASS!' });
    }
};