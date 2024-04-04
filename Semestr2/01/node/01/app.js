var http = require("http"); //module import

http.createServer(   // create server
    function (req, res) {         // listener function which is called when request is received
      res.write("Hello World!"); // write to reponse
      res.end(); // send reponse
    }
  )
  .listen(
    4700, // starts the HTTP server listening for request on port 4700
    console.log("server started") ); // optional callback function called after server starts
