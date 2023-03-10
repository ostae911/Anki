const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB || 'Anki';

mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB-Verbindung hergestellt');
    })
    .catch((err) => {
        console.error(`Fehler beim Herstellen der MongoDB-Verbindung: ${err}`);
        process.exit(1);
    });

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error(`MongoDB-Verbindungsfehler: ${err}`);
    process.exit(1);
});

connection.once('open', async () => {
    console.log('MongoDB-Verbindung geöffnet');

    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(collections)
        if (!collections.some((c) => c.name === 'cards')) {
            console.log('Die "cards" -Sammlung existiert nicht. Erstellen...');
            await mongoose.connection.createCollection('cards');
            console.log('Die "cards" -Sammlung wurde erstellt.');
        }
    } catch (err) {
        console.error(`Fehler beim Erstellen der "cards" -Sammlung: ${err}`);
        process.exit(1);
    }
});

const CardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    lastReviewed: {
        type: Date,
        default: Date.now,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
});

const Card = mongoose.model('Kart', CardSchema);

function selectNextCard(cards) {
    if (!cards || !cards.lastReviewed) {
        return null;
    }

    const now = Date.now();
    const minInterval = [1, 2, 4, 7, 15];
    const maxInterval = 30;
    const easinessFactor = 2.5;

    for (let i = 0; i < minInterval.length; i++) {
        const interval = minInterval[i];
        const nextReviewDate = new Date(cards.lastReviewed.getTime() + interval * 24 * 60 * 60 * 1000);
        if (nextReviewDate <= now) {
            const daysSinceLastReview = (now - cards.lastReviewed) / (24 * 60 * 60 * 1000);
            const nextInterval = Math.min(Math.round(interval * cards.easinessFactor), maxInterval);
            cards.reviewCount++;
            cards.easinessFactor = cards.easinessFactor + (0.1 - (5 - cards.questionDifficulty) * (0.08 + (5 - cards.questionDifficulty) * 0.02));
            cards.lastReviewed = now;
            return cards.save();
        }
    }

    return null;
}



app.get('/api/cards', async (req,res) => {
    try {
        const cards = await Card.find({});
        const nextCard = selectNextCard(cards);
        if (nextCard) {
            res.json(nextCard);
        } else {
            res.json(cards);
        }
    } catch (err) {
        console.error(`Fehler beim Abrufen der Karten: ${err}`);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// Endpoint zum Aktualisieren einer Karte
app.put('/api/cards/:id', (req, res) => {
    Card.findByIdAndUpdate(req.params.id, {
        question: req.body.question,
        answer: req.body.answer
    })
        .then(card => {
            res.json(card);
            io.emit('updatedCard',card);
        })
        .catch(err => res.status(400).json({ message: 'Fehler beim Aktualisieren der Karte' }));
});

// Endpoint zum Löschen einer Karte
app.delete('/api/cards/:id', (req, res) => {
    Card.findByIdAndDelete(req.params.id)
        .then(card => {
            res.json(card);
            io.emit('deletedCard', card);
        })
        .catch(err => res.status(400).json({ message: 'Fehler beim Löschen der Karte' }));
});

app.post('/api/cards', (req, res) => {
    const { question, answer } = req.body;
    const card = new Card({ question, answer });
    card.save()
        .then(savedCard => {
            res.json(savedCard);
            io.emit('newCard', savedCard);
        })
        .catch(err => {
            console.error(`Fehler beim Erstellen der Karte: ${err}`);
            res.status(500).json({ message: 'Interner Serverfehler' });
        });
});


// Fehlerbehandlung für unbekannte Endpunkte
app.use((req, res) => {
    res.status(404).json({ message: 'Seite nicht gefunden' });
});

// Server starten


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server gestartet auf Port ${PORT}`);

});














































































