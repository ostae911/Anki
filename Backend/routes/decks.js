const express = require('express');
const router = express.Router();
const decksController = require('../controllers/decksController');

router.post('/', decksController.createDeck);
router.put('/:id', decksController.updateDeck);
router.delete('/:id', decksController.deleteDeck);
router.get('/', decksController.getDecks);

module.exports = router;
