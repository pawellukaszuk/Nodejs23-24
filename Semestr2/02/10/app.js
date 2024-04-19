const express = require("express");
const app = express();
const fs = require("fs");

const saveData = (data) => {
    fs.appendFile(`time.txt`, data, (err) => {
        if (err) {
            throw err;
        }
    });
};
  
const requestTime = (req, res, next) => {
    let requestTime = new Date().toISOString();
    saveData("Request time " + requestTime + "\n");
    next();
};

const responseTime = (req, res, next) => {
    let responseTime = new Date().toISOString();
    saveData("Response time " + responseTime + "\n");
};

app.use(requestTime);

app.get("*", (req, res, next) => {
    res.send("Hello World");
    next();
});

app.use(responseTime);

app.listen(4700, console.log("start server"));
