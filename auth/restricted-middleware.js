const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeaderIsPresent = req.authorization;

    if (authHeaderIsPresent) {
        jwt.verify(authHeaderIsPresent, 'THIS IS A REALLY LONG SECRET', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ you: 'can\'t touch this' });
            } else {
                req.decodedToken = decodedToken;
                console.log('decoded token', req.decodedToken);
                
                next();
            }
        });
    }
};