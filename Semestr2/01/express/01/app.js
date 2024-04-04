// npm init
// npm install express

const express = require('express');
const app = express();

// wyłączenie zwracania nagłówka x-powered-by
app.disable('x-powered-by');

// pobieranie z parametrów URL
// http://localhost:4700/url-params
// http://localhost:4700/url-params/Jan
// http://localhost:4700/url-params/Anna
app.get('/url-params/:name?', (req, res) => {
    const name = req.params.name || 'world';
    res.send(`Hello ${name}`);
});

// pobieranie z query stringa
// http://localhost:4700/query-string-params
// http://localhost:4700/query-string-params?name=Jan
// http://localhost:4700/query-string-params?name=Jan&name=Anna
app.get('/query-string-params', (req, res) => {
    const name = req.query.name || 'World';
    res.send(`Hello ${name}`);
});

app.listen(4700, console.log('server started'));
