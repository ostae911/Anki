const express = require('express');
const router = express.Router();
const decksController = require('../controllers/decksController');

router.post('/', decksController.createDeck);
router.put('/:deckId', decksController.updateDeck);
router.delete('/:deckId', decksController.deleteDeck);
router.get('/', decksController.getDecks);

module.exports = router;
