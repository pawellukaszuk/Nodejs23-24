// npm init -y
// npm i dotenv
// npm i express
// npm i mongodb

require("dotenv").config();
const express = require("express");

const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");

if (!process.env.CONNECTION_STRING || !process.env.DATABASE_NAME) {
    console.error("################ please rename file `sample.env` to `.env` and set up variables ################")
    process.exit(1);
}

// przed uruchomieniem aplikacji najpierw uruchom setup.js by dodać nowe dokumenty do kolekcji

const client = new MongoClient(process.env.CONNECTION_STRING, { serverApi: ServerApiVersion.v1 });

client.connect()
.then(() => {
    const taskColletion = client.db(process.env.DATABASE_NAME).collection("tasks");

    app.get("/tasks", async (req, res) => {
        const tasks = await taskColletion.find().toArray();
        res.send(tasks);
    });

    app.get("/heartbeat", (req, res) => {
        res.send(new Date());
    })
});

app.listen(process.env.PORT, console.log("server started on port " + process.env.PORT));
