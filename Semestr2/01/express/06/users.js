const express = require('express');

const router = express.Router();

const users = [{
    name: 'Adam',
    username: 'adamek',
    email: 'adam@adamek.abc',
}];

// http://localhost:4700/users/add?name=Jan&username=janko&email=jan@nowak.abc
router.post('/add', (req, res) => {
    users.push(req.query)
    res.send(users);
});

// http://localhost:4700/users/
router.get('/', (req, res) => {
    res.send(users);
});

// http://localhost:4700/users/0
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(users[id]);
});

// http://localhost:4700/users/delete/0
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    users.splice(id, 1);
    res.send(users);
});

module.exports = router;
