const Card = require('../models/card');

exports.createCard = async (req, res) => {
    try {
        const newCard = new Card(req.body);
        await newCard.save();
        res.status(201).json({ card: newCard });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCard = async (req, res) => {
    try {
        const cardId = req.params.id;
        const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
        res.status(200).json({ card: updatedCard });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const cardId = req.params.id;
        await Card.findByIdAndDelete(cardId);
        res.status(200).json({ message: 'Karte gelöscht' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json({ cards });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCardById = async (req, res) => {
    try {
        const cardId = req.params.id;
        const card = await Card.findById(cardId);

        if (!card) {
            res.status(404).json({ error: 'Karte nicht gefunden' });
            return;
        }

        res.status(200).json({ card });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


