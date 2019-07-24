// accept the expected role
module.exports = role => {
  // return middleware
  return function(req, res, next) {
    // make sure the roles property is in the token's payload and that the desired role is present
    if (req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      // return a 403 Forbidden, the user is logged in, but has no access
      res.status(403).json({ you: 'you have no power here!' });
    }
  };
};
