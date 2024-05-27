// npm i express
// npm i mustache-express
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + "/views");

app.get("*", (req, res) => {
    const scope = {
        title: "Hello World",
        header: "this is page created with template engine",
        paragraphText: "this is text from paragraph", 
        showHidden: false,
        letters: ["A", "B", "C", "D"],
        img: {
            link: "https://www.purina.co.uk/sites/default/files/2020-11/Top-5-Cats-That-Look-Like-Tigers-Leopards-and-OtherTEASER.jpeg",
            altText: "cat",
            width: 500,
            height: 300,
        },
        cssLink: "https://mincss.com/entireframework.min.css"
    }

    res.render('index', scope);
});

app.listen(4700, () => console.log('server started'));
