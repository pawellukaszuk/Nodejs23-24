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

function getUser(login, password){
    return users.find(u => u.login === login && u.password === password);
}

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token && token.includes(":")){
        const [login, password] = token.split(':');

        const user = getUser(login, password);
        if (user != null){
            res.userName = user.name;
            next();
        }
    }
    else {
        res.status(401);
        res.send("bad token");
    }
};

app.use(authMiddleware);

app.get('/', (req, res) => {
    res.send(`Hello ${res.userName}`);
});

app.listen(4700, console.log('server started'));
