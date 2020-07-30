const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
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
  let fetchedUser;
  const errMessage = 'Invalid credentials';

  User.findOne({username: req.body.username})
    .then(user => {
      // * if username not found
      if(!user){
        return res.status(401).json({message: errMessage});
      }
      // * if username found
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      // * if password incorrect
      if(!result){
        return res.status(401).json({message: errMessage});
      }
      // * if password correct create web token
      const token = jwt.sign(
        {username: fetchedUser.username, userId: fetchedUser._id},
        process.env.JWT,
        {expiresIn: '1h'}
      );
      res.status(200).json({
        message: 'login success',
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        username: fetchedUser.username,
        favorites: fetchedUser.favorites
      });
    })
    .catch(err => {
      return res.status(401).json({message: errMessage});
    })

};

exports.getUserFavorites = (req,res,next) => {
  const userId = req.query.id;
  User.findById(userId)
    .then(result => {
      return res.status(200).json({
        message: 'success',
        favorites: result.favorites
      })
    })
    .catch(err => {
      return res.status(404).json({message: 'failed'})
    })
}

exports.updateFavorites = (req, res, next) => {
  const userId = req.body.userId;
  const favorites = req.body.favorites;

  User.findByIdAndUpdate(userId, {favorites: favorites})
    .then(result => {
      res.status(201).json({message: "success"});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: "error"});
    })
}