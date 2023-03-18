const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' }
});

module.exports = mongoose.model('Deck', deckSchema);
