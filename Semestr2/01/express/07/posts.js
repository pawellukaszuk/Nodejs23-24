const express = require('express');

const router = express.Router();

const posts = [{
    title: 'Ala ma kota',
    body: 'a kot ma Ale',
}];

// http://localhost:4700/posts/add/
router.post('/add', (req, res) => {
    // pobranie obiektu z ciała żądania
    const newPost = req.body;    
    posts.push(newPost)
    res.send(posts);
});

// http://localhost:4700/posts/
router.get('/', (req, res) => {
    res.send(posts);
});

// http://localhost:4700/posts/0
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(posts[id]);
});

// http://localhost:4700/posts/delete/0
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    posts.splice(id, 1);
    res.send(posts);
});

module.exports = router;
