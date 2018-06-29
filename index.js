/*var express = require ("express");
var app = express();
var server = require("http").Server(app);

    app.use(express.static("public"));

server.listen(3000, function () {console.log("Server started on port 3000!!!")});

app.get("/", function (req,res) { 

    res.render("index.html");

})
*/

var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello Azure and GIT!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
