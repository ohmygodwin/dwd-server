var http = require('http');

var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end("<h1>hey y'all</h1>");
});

server.listen(3000, 'localhost');

