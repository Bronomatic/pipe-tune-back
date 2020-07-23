const router = require('express').Router();

const tuneController = require('../controllers/tune');

router.post('/create', tuneController.createTune);

router.get('/tune', tuneController.getTuneById);

module.exports = router;