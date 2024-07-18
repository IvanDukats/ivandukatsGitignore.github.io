const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let sessions = {};

app.post('/submit', (req, res) => {
    const { sessionId, message } = req.body;
    if (!sessions[sessionId]) {
        sessions[sessionId] = [];
    }
    sessions[sessionId].push({ message, likes: 0 });
    res.json({ sessionId });
});

app.get('/session/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    res.json(sessions[sessionId] || []);
});

app.post('/like', (req, res) => {
    const { sessionId, messageIndex } = req.body;
    if (sessions[sessionId] && sessions[sessionId][messageIndex]) {
        sessions[sessionId][messageIndex].likes += 1;
        res.json({ likes: sessions[sessionId][messageIndex].likes });
    } else {
        res.status(400).json({ error: 'Invalid session or message index' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



