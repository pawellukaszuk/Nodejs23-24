const http = require("http");

const app = http.createServer((request, response) => {
    response.writeHead(200, {"Content-type":"text/plain"});
    response.write("Hello World");
    response.end();
});

app.listen(4700, console.log("server started"));
