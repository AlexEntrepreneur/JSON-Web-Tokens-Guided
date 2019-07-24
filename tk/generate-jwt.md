## Produce and Send a JWT

In this section we'll use JSON Web Tokens to handle authentication.

To produce and verify the token we'll use the `jsonwebtoken` npm module.

Let's produce and send a token on successful login.

- add `jsonwebtoken` to the project and require it into `auth-router.js`.
- change the `/login` endpoint inside the `auth-router.js` to produce and send the token.

```js
// ./auth/auth-router.js

const jwt = require('jsonwebtoken'); // installed this library

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line

        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}
```

- add the `./config/secrets.js` file to hold the `jwtSecret`

```js
// the secrets will be safely stored in an environment variable, these are placeholders for development
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'add a third table for many to many',
};
```

require _secrets.js_ into _auth-router.js_: `const secrets = require('../config/secrets.js');`

- login with the student/hired user and show the token
- review the steps taken one more time.

We have a server that can produce and send JWTs on successful login.
