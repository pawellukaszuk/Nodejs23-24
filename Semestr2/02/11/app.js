const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();

function addToLogs(message, logsPath) {
    fs.appendFile(logsPath, message, "utf8", (err) => {
        if (err) {
            throw err;
        }
    });
}

app.get("/", (req, res) => {
    res.send("The main page");
})

app.get("/users/:userId", (req, res, next) => {
    axios.get("https://jsonplaceholder.typicode.com/users/" + req.params.userId)
        .then((response) => {
            res.status(200);
            res.json(response.data);
        })
        .catch((error) => {
            console.log("An error ocurred. Details to be found in a log file");
            next(error);
        })
})

app.use((error, req, res, next) => {
    let msg = new Date() + " " + error.config.url + " => statusCode: " + error.response.status;
    addToLogs(msg + "\n\n", "logs.txt");
    return res.status(error.response.status).json({
        error: {
            nonTechnicalDescription: "An error occured. Sorry",
            technicalDetails:
            {
                url: error.config.url,
                code: error.response.status,
                textDescription: error.response.statusText
            }
        }
    });
});

app.listen(4700, console.log("start server"));
