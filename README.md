# Voraussetzungen
Node.js(v16.17.1)
MongoDB (Docker)
npm(8.15.0)
# Installation
Klonen Sie das Repository.

# Backend
- Navigieren Sie in das Verzeichnis Backend
- Führen Sie den Befehl npm install aus
- Führen Sie den Befehl docker compose up aus, um die MongoDB zu initialisieren
- Führen Sie den Befehl node app.js aus oder starten Sie die app.js alternativ(WebStorm)
- Sie erreichen nun das Backend über die in der im Projekt hinterlegten Postman-Collection: NOSQL.postman_collection.json
- Importieren Sie diese in Postman und führen Sie Aktionen direkt an der Schnittstelle durch

# Frontend
- Navigieren Sie in das Verzeichnis Frontend
- Führen Sie den Befehl npm install aus
- Führen Sie den Befehl npm start aus, um die Anwendung zu Starten diese erreichen Sie über localhost:3000

# Zugang Datenbank 
- Die Inhalte der Datenbank, können Sie über DataGrip einsehen, dazu ist kein Passwort erforderlich
- Wählen Sie bitte als Driver MongoDB in DataGrip aus und fügen sie folgende URL: mongodb://localhost:27017/Anki in das URL Feld ein
- Ein Passwort oder ein Benutzername sind hierzu nicht notwendig, es reicht der Connection-String

# Allgemeine Bedienungsinformationen
- Erstellen Sie Decks, um verschiedene Themen oder Fächer zu organisieren.
- Fügen Sie Karten zu den Decks hinzu, die Informationen zum Lernen enthalten.
- Beginnen Sie eine Lernsession, um Karten aus einem ausgewählten Deck basierend auf der Spaced-Repetition-Methode zu überprüfen.
- Bewerten Sie Ihr Verständnis jeder Karte nach dem Anzeigen.
- Die Anwendung verwendet Ihre Bewertung, um die nächste Überprüfung für diese Karte zu planen.

# Funktionalitäten
- Erstellen, bearbeiten und löschen von Decks und Karten.
- Anzeigen von Karten basierend auf der Spaced-Repetition-Methode.
- Benutzerdefinierte Bewertung von Karten, um den Lernfortschritt zu verfolgen.
- Automatische Planung der nächsten Überprüfung von Karten basierend auf Benutzerbewertungen.

