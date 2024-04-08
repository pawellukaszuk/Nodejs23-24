const express = require("express");
const app = express();

const requestTime = (req, res, next) => {
    let requestTime = new Date().toISOString();
    console.log(`Request time: ${requestTime}`);
    next();
};

const responseTime = (req, res, next) => {
    let responseTime = new Date().toISOString();
    console.log(`Response time: ${responseTime}`);
};

app.use(requestTime);

app.get("*", (req, res, next) => {
    res.send("Hello World");
    next();
});

app.use(responseTime);

app.listen(4700, console.log("start server"));
