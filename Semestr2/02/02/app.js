const express = require('express');
const app = express();

function isVerifiedToken(token){
    return token === 'alamakota';
}

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (isVerifiedToken(token)){
        next();
    }
    else {
        res.status(401);
        res.send("bad token");
    }
}

app.use(authMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(4700, console.log('server started'));
