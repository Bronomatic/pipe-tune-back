const router = require('express').Router();

const tuneController = require('../controllers/tune');

router.post('/create', tuneController.createTune);

module.exports = router;