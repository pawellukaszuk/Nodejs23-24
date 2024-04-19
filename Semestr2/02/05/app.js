const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const forbiddenWords = ['piwo', 'hazard', 'cukierki'];

app.use(bodyParser.text());

// http://localhost:4700
app.get('/', (req, res) => {
    fs.readFile('data.txt', 'utf8', (error, data) => {
        res.send(data);
    })
});

// http://localhost:4700/dictionary
app.get('/dictionary', (req, res) => {
    res.send(forbiddenWords);
});

// http://localhost:4700
// POST: ala ma cukierki
app.post('/', (req, res) => {
    const hasForbiddenWord = forbiddenWords.some(word => req.body.includes(word));

    if (hasForbiddenWord) {
        res.status(400).send('forbidden word');
    } else {
        fs.writeFile('data.txt', req.body, () => {
            res.send('ok');
        });
    }
});

app.listen(4700, console.log('server started'));