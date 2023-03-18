const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const decksRouter = require('./routes/decks');
const cardsRouter = require('./routes/cards');
const sessionsRouter = require('./routes/session');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

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

app.use('/decks', decksRouter);
app.use('/cards', cardsRouter);
app.use('/sessions', sessionsRouter);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // You can add more Socket.IO events here as needed.
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

