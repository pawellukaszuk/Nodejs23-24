const express = require('express');

const app = express();

const users = require('./users')
const posts = require('./posts')

// potrzebne do parsowania ciała żądania w formacie JSON
app.use(express.json()); 

// routing dla ścieżki /users
app.use('/users', users);

// routing dla ścieżki /posts
app.use('/posts', posts);

app.listen(4700, () => console.log('server started'));
