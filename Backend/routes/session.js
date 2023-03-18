const express = require('express');
const sessionsController = require('../controllers/sessionsController');

const router = express.Router();

router.get('/:deckId/next-card', sessionsController.getNextCardForReview);
router.get('/:deckId/start', sessionsController.startSession);
router.post('/:cardId/review', sessionsController.reviewCard);

module.exports = router;

