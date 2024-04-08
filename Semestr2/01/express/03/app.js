const express = require('express');
const app = express();

// http://localhost:4700/mnozenie/4/5
app.get('/mnozenie/:a/:b', (req, res) => {
    const { a, b } = req.params;
    if (isNaN(a) || isNaN(b)) {
        res.statusCode = 400;
        res.send('parametry powinny być liczbami');
    } else {
        const result = a * b;
        res.send(result.toString());
    }
});

// http://localhost:4700/dzielenie/4/5
// http://localhost:4700/dzielenie/4/0
app.get('/dzielenie/:a/:b', (req, res) => {
    const { a, b } = req.params;
    if (b == 0) {
        res.statusCode = 400;
        res.send("dzielenie przez 0");
    } else if (isNaN(a) || isNaN(b)) {
        res.statusCode = 400;
        res.send('parametry powinny być liczbami');
    } else {
        const result = a / b;
        res.send(result.toString());
    }
});

// http://localhost:4700/dodawanie/4/5
app.get('/dodawanie/:a/:b', (req, res) => {
    const { a, b } = req.params;
    if (isNaN(a) || isNaN(b)) {
        res.statusCode = 400;
        res.send('parametry powinny być liczbami');
    } else {
        const result = Number(a) + Number(b);
        res.send(result.toString());
    }
});

// http://localhost:4700/odejmowanie/4/5
app.get('/odejmowanie/:a/:b', (req, res) => {
    const { a, b } = req.params;
    if (isNaN(a) || isNaN(b)) {
        res.statusCode = 400;
        res.send('parametry powinny być liczbami');
    } else {
        const result = a - b;
        res.send(result.toString());
    }
});

app.listen(4700, console.log('server started'));
