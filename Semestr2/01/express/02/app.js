const express = require('express');
const app = express();

// http://localhost:4700/4/5
// http://localhost:4700/4/50
// http://localhost:4700/2/3
app.get('/:a/:b', (req, res) => {
    const { a, b } = req.params;

    if (isNaN(a) || isNaN(b)) {
        res.statusCode = 400;
        res.send('parametry powinny być liczbami');
    } else {
        const result = a * b;
        res.send(result.toString());
    }
});

app.listen(4700, console.log('server started'));
