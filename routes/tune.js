const router = require('express').Router();

const checkAuth = require('../middleware/check-auth');
const tuneController = require('../controllers/tune');

router.post('/create', checkAuth, tuneController.createTune);
router.post('/update', checkAuth, tuneController.updateTune);
router.get('/:id', tuneController.getTuneById);
router.delete('/delete/:id', checkAuth, tuneController.deleteTune);

module.exports = router;