const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  console.log(req.body);

  // return res.status(200).json({message: 'data coming soon'});
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // console.log(hash);
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash
      })
      user.save().then(result => {
        res.status(201).json({
          message: 'User created',
          result: result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'User creation failed'
        });
      })
    })
};

exports.loginUser = (req, res, next) => {
  console.log(req.body);
  return res.status(200).json({message: 'data coming soon'});
};