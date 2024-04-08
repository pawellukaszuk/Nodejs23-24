const http = require("http");

const app = http.createServer((request, response) => {
    let body = '';
    let statusCode;
    const urlObject = new URL(request.url, `http://${request.headers.host}`);
    const a = urlObject.searchParams.get("a");
    const b = urlObject.searchParams.get("b");

    if (a && b && !isNaN(a) && !isNaN(b)) {
        body = `${a} * ${b} = ${a * b}`;
        statusCode = 200;
    }
    else {
        body = 'Oczekiwano parametrów a i b';
        statusCode = 400;
    }

    response.writeHead(statusCode, {'Content-type' : 'text/plain;charset=utf-8'});
    response.write(body);
    response.end();
});

app.listen(4700);
