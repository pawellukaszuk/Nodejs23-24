const http = require("http");

const app = http.createServer((request, response) => {
    if (request.method === "GET"){
        response.writeHead(200, {"Content-type":"text/plain"});
        response.write("Hello World from method GET");
    } else if (request.method === "POST") {
        response.writeHead(201, {"Content-type":"text/plain"});
        response.write("Hello World from method POST");
    } else {
        response.writeHead(202, {"Content-type":"text/plain"});
        response.write("Hello World from other method");
    }

    response.end();
});

app.listen(4700, console.log("server started"));
