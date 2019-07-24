## Read, Decode and Verify the Token

Modify `./auth/restricted-middleware.js` to verify and decode the token.

```js
const jwt = require('jsonwebtoken'); // installed this library

const secrets = require('../config/secrets.js'); // another use for secrets

module.exports = (req, res, next) => {
  // tokens are commonly  sent as the authorization header
  const token = req.headers.authorization;

  if (token) {
    // is it valid?
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token is not valid
        res.status(401).json({ you: "can't touch this!" });
      } else {
        // the token is valid and was decoded
        req.decodedJwt = decodedToken; // make the token available to the rest of the API
        console.log('decoded token', req.decodedJwt); // show this in the terminal

        next();
      }
    });
  } else {
    // no token? bounced!
    res.status(401).json({ you: 'shall not pass!' });
  }
};
```

- make a GET to `/api/users` do not provide the authorization header. No access.
- login, copy the token (take care to NOT copy the wrapping quotes).
- make another GET to `/api/users`, but this time add the `Authorization header` with the token as the value. Success!
- change a character in the token and try again. Fails verification and request is blocked.
- review all steps one more time.
