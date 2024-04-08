const fs = require('fs');
const path = require('path')
const express = require('express');
const app = express();

const fileMiddleware = (req, res, next) => {
    const filePath = path.join(__dirname, req.url);
    if (fs.existsSync(filePath)) {
        console.log('file exist');
        res.sendFile(filePath);
    } else {
        next();
    }
}

app.use(fileMiddleware);

// http://localhost:4700/image.jpg
// http://localhost:4700/music.txt
// http://localhost:4700/comment.txt
app.get('/:filename', (req, res) => {
    res.send(`file ${req.params.filename} does not exists`);
});

app.listen(4700, console.log('start server'));
