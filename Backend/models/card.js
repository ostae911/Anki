const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    front: { type: String, required: true },
    back: { type: String, required: true },
    deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' },
    nextReviewDate: { type: Date, default: Date.now },
    interval: { type: Number, default: 1 },
    factor: { type: Number, default: 2.5 },
    reviewCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Card', cardSchema);
