const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardsControllers');

router.post('/', cardsController.createCard);
router.put('/:id', cardsController.updateCard);
router.delete('/:id', cardsController.deleteCard);
router.get('/:id', cardsController.getCardById)
router.get('/', cardsController.getCards);

module.exports = router;
