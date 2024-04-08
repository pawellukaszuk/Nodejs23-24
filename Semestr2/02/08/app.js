const express = require('express');
const app = express();

app.use("/images", express.static("./images"));

// http://localhost:4700/images/sample.jpg
app.get('/images/:filename', (req, res) => {
    res.send(`file ${req.params.filename} does not exists`);
});

app.listen(4700, console.log('start server'));
