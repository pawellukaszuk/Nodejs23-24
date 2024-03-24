const express = require('express');
const app = express();

let users = [{
    id: 1,
    firstName: 'Adam',
    lastName: 'adamek',
    email: 'adam@adamek.abc',
}];

// http://localhost:4700/users?firstName=Jan&lastName=janko&email=jan@nowak.abc
app.post('/users', (req, res) => {
    // TODO
});

// http://localhost:4700/users
app.get('/users', (req, res) => {
    // TODO
});

// http://localhost:4700/users/1
app.get('/users/:id', (req, res) => {
    // TODO
});

// http://localhost:4700/users/1
app.delete('/users/:id', (req, res) => {
    // TODO
});

app.listen(4700, console.log('server started'));
