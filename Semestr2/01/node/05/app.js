const http = require("http");

const app = http.createServer((request, response) => {
    const urlObject = new URL(`http://${request.headers.host}${request.url}`);
    
    response.writeHead(200, {'Content-type':'text/plain'});
    response.write(`Hello ${urlObject.searchParams.get('name') || 'World'}`);
    
    response.end();
});

app.listen(4700, console.log("server started"));
