const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // * get web token from header
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
    req.userData = {
      username: decodedToken.username,
      userId: decodedToken.userId
    }
    next();
  } catch(err) {
    res.status(401).json({message: 'Unauthenticated'});
  }
};