const http = require("http");

const mul = (x, y) => x * y;
const div = (x, y) => x / y;
const add = (x, y) => x + y;
const sub = (x, y) => x - y;

const app = http.createServer((request, response) => {
    let body = '';
    let statusCode = 200;
    let result;
    const urlObject = new URL(request.url, `http://${request.headers.host}`);
    const a = urlObject.searchParams.get("a");
    const b = urlObject.searchParams.get("b");

    if (!a || !b || isNaN(a) || isNaN(b)) {
        body = 'Oczekiwano parametrów a i b';
        statusCode = 400;
    }
    else {
        switch (urlObject.pathname) {
            case "/mnozenie":
                result = mul(a, b);
                body = `${a} * ${b} = ${result}`;
                break;
            case "/dzielenie":
                if (b == 0) {
                    statusCode = 400;
                    body = `dzielenie przez 0`;        
                }
                result = div(a, b);
                body = `${a} / ${b} = ${result}`;
                break;
            case "/dodawanie":
                result = add(Number(a), Number(b));
                body = `${a} + ${b} = ${result}`;
                break;
            case "/odejmowanie":
                result = sub(a, b);
                body = `${a} - ${b} = ${result}`;
                break;
            default:
                statusCode = 400;
                body = `nieprawidłowa operacja`;
        }
    }

    response.writeHead(statusCode, { 'Content-type': 'text/plain;charset=utf-8' });
    response.write(body);
    response.end();
});

app.listen(4700);
