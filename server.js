var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./test.txt', function (err, data){
		res.end(data);
	})
});

var port = Number(process.env.PORT || 5000);
server.listen(port);

