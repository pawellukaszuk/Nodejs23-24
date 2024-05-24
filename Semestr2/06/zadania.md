# Node.js - Laboratorium 6

## templates (https://expressjs.com/en/guide/using-template-engines.html)

### `application with Pug`
```javascript
// npm install pug
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    const scope = { header: 'heloo!', paragraphText: 'some paragraph text' };
    res.render('index', scope);
});

app.listen(4700, () => console.log('start server'));
```
### `template pug(views/index.pug)` (https://pugjs.org/api/getting-started.html)
```pug
html
    body
        h1= header
        p= paragraphText
```

### `application with mustache.js`
```javascript
// npm install mustache-express
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    const scope = { header: 'heloo!', paragraphText: 'some paragraph text' };
    res.render('index', scope);
});

app.listen(4700, () => console.log('start server'));
```
### `template mustache(views/index.mustache)` (https://mustache.github.io/mustache.5.html)
```mustache
<html>
    <head>
        <title></title>
    </head>
    <body>
        <h1>{{ header }}</h1>
        <p>{{ paragraphText }}</p>
    </body>
</html>
```

## Testing
Writing tests https://learning.postman.com/docs/writing-scripts/test-scripts/

Test script examples https://learning.postman.com/docs/writing-scripts/script-references/test-examples/

Postman JavaScript reference https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/

Running collections on the command line with Newman https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/

## Zadania do wykonania

1. Stwórzmy naszą pierwszą aplikację serwerową wykorzystującą system szablonów `PUG`. Wyświetlmy taki dokument:
```json
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
```

2. Przećwiczmy obsługę szablonów zmieniając system szablonów `PUG` na `MUSTACHE`(https://github.com/bryanburgers/node-mustache-express). Stwórzmy aplikację która zadziała tak samo jak ta z poprzedniego zadania..

3. Mamy dwa endpointy - pierwszy z nich zwraca dane użytkownika o podanym Id, drugi pogodę w lokalizacji o danych współrzędnych geograficznych.
Za pomocą Postmana przygotujmy testy dla każdego z tych endpointów.
Id użytkownika będziemy pobierać ze zmiennych środowiskowych.
Współrzędne geograficzne uzyskane z pierwszego żądania wykorzystajmy do żądania drugiego
- API użytkownika: https://jsonplaceholder.typicode.com/users/{{userId}}
- API pogody: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={{lat}}&lon={{lng}}
