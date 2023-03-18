const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardsControllers');

router.post('/', cardsController.createCard);
router.put('/:cardId', cardsController.updateCard);
router.delete('/:cardId', cardsController.deleteCard);
router.get('/', cardsController.getCards);

module.exports = router;
