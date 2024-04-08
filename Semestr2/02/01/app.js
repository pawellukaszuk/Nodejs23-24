const express = require('express');
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`HTTP method:${req.method}, URL:${req.url}, QueryString`, req.query);
    next(); // next przekazuje dalszą obsługę żądania do routingu -> app.get
};

app.use(loggerMiddleware);

app.get('*', (req, res) => {
    res.send('hello!');
});

app.listen(4700, console.log('server started'));
