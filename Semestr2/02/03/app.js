const express = require('express');
const app = express();

const users = [{
    login: 'jan',
    password: 'alamakota',
    name: 'Jan',
}, {
    login: 'adam',
    password: 'cukierki',
    name: 'Adam',
}];

function isVerifiedToken(token){
    if (!token){
        return false;
    }

    const [login, password] = token.split(':');
    return users.some((user) => user.login === login && user.password === password)
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
