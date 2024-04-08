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
    if (!req.query.firstName || !req.query.lastName || !req.query.email) {
        res.status(400).send('Missing parameters'); // bad request
    }
    else {
        let userIds = users.map(u => u.id);
        let maxUserId = Math.max(...userIds);
        let newUserId = maxUserId + 1;
        
        const newUser = {
            id: newUserId,
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            email: req.query.email,
        }

        users.push(newUser)
        res.statusCode = 201; // created
        res.send(newUser);
    }
});

// http://localhost:4700/users
app.get('/users', (req, res) => {
    // zwracając wartość za pomocą res.json() express sam przetworzy obiekt na JSON i ustawi odpowiedni content-type
    res.json(users);

    // możemy też użyć res.send(users); - tutaj konwersja do JSON zajdzie tylko wtedy gdy parametr users jest tablicą lub obiektem
});

// http://localhost:4700/users/1
app.get('/users/:id', (req, res) => {
    const user = users.filter(
        (u) => u.id == req.params.id
    );

    if (user.length == 0) {
        res.status(404).send('User not found');
    }

    // zwracając wartość za pomocą res.json() express sam przetworzy obiekt na JSON i ustawi odpowiedni content-type
    res.json(user[0]);

    // możemy też użyć res.send(user[0]); - tutaj konwersja do JSON zajdize tylko wtedy gdy parametr users jest tablicą lub obiektem
});

// http://localhost:4700/users/1
app.delete('/users/:id', (req, res) => {
    const userExists = users.find(
        (u) => u.id == req.params.id
    );

    if (!userExists) {
        res.statusCode = 404;
        res.send("Not found");
    } else {
        users = users.filter(
            (u) => u.id != req.params.id
        );
        res.statusCode = 204; // no content
        res.send();
    }
});

app.listen(4700, console.log('server started'));
