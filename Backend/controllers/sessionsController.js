const Card = require('../models/card');
const spacedRepetition = require('../utils/spacedRepetition');

exports.startSession = async (req, res) => {
    try {
        const deckId = req.params.deckId;
        const cards = await Card.find({ deck: deckId, nextReviewDate: { $lte: new Date() } }).sort('nextReviewDate');
        res.status(200).json({ cards });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getNextCardForReview = async (req, res) => {
    try {
        const deckId = req.params.deckId;
        const card = await Card.findOne({ deck: deckId, nextReviewDate: { $lte: new Date() } }).sort('nextReviewDate');
        if (card) {
            res.status(200).json({ card });
        } else {
            res.status(200).json({ message: 'Für dieses Deck gibt es heute nichts mehr zu tun.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.reviewCard = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        const { rating } = req.body;

        const card = await Card.findById(cardId);
        if (!card) {
            res.status(404).json({ error: 'Card not found' });
            return;
        }

        const { nextReviewDate, interval, factor } = spacedRepetition(card, rating);
        card.nextReviewDate = nextReviewDate;
        card.interval = interval;
        card.factor = factor;
        card.reviewCount += 1;

        await card.save();
        res.status(200).json({ card });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


