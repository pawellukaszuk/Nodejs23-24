const express = require('express');
const app = express();

let users = [{
    id: 1,
    name: 'Adam',
    username: 'adamek',
    email: 'adam@adamek.abc',
}];

let posts = [{
    id: 1,
    title: 'Ala ma kota',
    body: 'a kot ma Ale',
}];

// middleware potrzebny do parsowania ciała żądania w formacie JSON
app.use(express.json()); 

// http://localhost:4700/users?name=Jan&username=janko&email=jan@nowak.abc
app.post('/users', (req, res) => {
    if (!req.query.name || !req.query.username || !req.query.email) {
        res.status(400).send('Missing parameters'); // bad request
    }

    let userIds = users.map(u => u.id);
    let maxUserId = Math.max(...userIds);
    let newUserId = maxUserId + 1;
    
    const newUser = {
        id: newUserId,
        name: req.query.name,
        username: req.query.username,
        email: req.query.email,
    }

    users.push(newUser)
    res.statusCode = 201; // created
    res.send(newUser);
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

// http://localhost:4700/posts
app.post('/posts', (req, res) => {
    // pobranie obiektu z ciała żądania
    const datafromBody = req.body;
    if (!datafromBody.title || !datafromBody.body) {
        res.status(400).send('Missing parameters'); // bad request
    }

    let postIds = posts.map(u => u.id);
    let maxPostId = Math.max(...postIds);
    let newPostId = maxPostId + 1;
    
    const newPost = {
        id: newPostId,
        title: datafromBody.title,
        body: datafromBody.body
    }

    posts.push(newPost)
    res.statusCode = 201;
    res.send(newPost);
});

// http://localhost:4700/posts/
app.get('/posts', (req, res) => {
    // zwracając wartość za pomocą res.json() express sam przetworzy obiekt na JSON i ustawi odpowiedni content-type
    res.json(posts);

    // możemy też użyć res.send(posts); - tutaj konwersja do JSON zajdize tylko wtedy gdy parametr users jest tablicą lub obiektem
});

// http://localhost:4700/posts/0
app.get('/posts/:id', (req, res) => {
    const post = posts.filter(
        (u) => u.id == req.params.id
    );

    if (post.length == 0) {
        res.status(404).send('Post not found');
    }

    // zwracając wartość za pomocą res.json() express sam przetworzy obiekt na JSON i ustawi odpowiedni content-type
    res.json(post[0]);

    // możemy też użyć res.send(post[0]); - tutaj konwersja do JSON zajdize tylko wtedy gdy parametr users jest tablicą lub obiektem
});

// http://localhost:4700/posts/delete/0
app.delete('/posts/:id', (req, res) => {
    const postExists = posts.find(
        (u) => u.id == req.params.id
    );

    if (!postExists) {
        res.statusCode = 404;
        res.send("Not found");
    } else {
        posts = posts.filter(
            (u) => u.id != req.params.id
        );
        res.statusCode = 204;
        res.send();
    }
});

app.listen(4700, () => console.log('server started'));
