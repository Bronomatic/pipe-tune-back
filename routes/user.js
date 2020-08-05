const router = require('express').Router();

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/favorites', checkAuth, userController.updateFavorites);
router.get('/favorites', checkAuth, userController.getUserFavorites);

module.exports = router;