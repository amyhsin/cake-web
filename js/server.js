// var http = require("http");

// http.createServer(function(req, res){
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.write("Hi");
//     res.end();
// }).listen(8888);

/*
var http = require("http");

function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");
*/


var http = require("http");

function start(){
    function onRequest(req, res){
        console.log("Request received.");
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.write("Hello");
        res.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server is running on port 8888.");
}

exports.start = start; 