var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	var url = req.url;
	if (url === '/'){
		url = '/index.html';
	}

	console.log("URL: " + url);

	var filepath = __dirname + "./public" + url;

	res	.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile(filepath, function (err, data){
		if (err){
			console.log("error: "+ err);
			res.end("error");
		}
		else {
		res.end(data);
		}
	})
});

var port = Number(process.env.PORT || 5000);
server.listen(port);

