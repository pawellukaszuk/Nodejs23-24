const http = require("http");

const app = http.createServer((request, response) => {
    const urlObject = new URL(request.url, `http://${request.headers.host}`);
    const headers = {'Content-type' : 'application/json'};

    let params = {};
    for (let param of urlObject.searchParams){
        params[param[0]] = param[1];
    }

    const body = JSON.stringify(params);
    response.writeHead(200, headers);
    response.end(body);
});

app.listen(4700);
