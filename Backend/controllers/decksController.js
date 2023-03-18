const Deck = require('../models/deck');

exports.createDeck = async (req, res) => {
    try {
        const newDeck = new Deck(req.body);
        await newDeck.save();
        res.status(201).json({ deck: newDeck });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDeck = async (req, res) => {
    try {
        const deckId = req.params.id;
        const updatedDeck = await Deck.findByIdAndUpdate(deckId, req.body, { new: true });
        res.status(200).json({ deck: updatedDeck });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDeck = async (req, res) => {
    try {
        const deckId = req.params.id;
        await Deck.findByIdAndDelete(deckId);
        res.status(200).json({ message: 'Deck deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDecks = async (req, res) => {
    try {
        const decks = await Deck.find();
        res.status(200).json({ decks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
