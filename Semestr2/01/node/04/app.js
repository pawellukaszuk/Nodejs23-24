const http = require("http");

const app = http.createServer((request, response) => {
    response.writeHead(200, {"Content-type":"text/plain"});
    
    if (request.url === "/users") {
        response.write("Hello from Users path");
    }
    else if (request.url === "/comments") {
        response.write("Hello from Comments path");
    }
    else {
        response.write("Hello World from other path");
    }

    response.end();
});

app.listen(4700, console.log("server started"));
