const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');
const checkRole = require('../auth/check-role-middleware');
const Users = require('./users-model.js');

router.get('/', restricted, checkRole('Student'),  (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
