var http = require('http');
var fs = require('fs');

console.log('Starting server');

function getFilepath(url){
  var filepath = require('url').parse(url).pathname;

  if (filepath === '/') {
    filepath = '/index.html';
  }

  filepath = __dirname + '/public' + filepath;

  console.log('Getting filepath from url: ' + url + '. Filepath: ' + filepath);
  return filepath;
}

var server = http.createServer(function(req, res){

	var filepath = getFilepath(req.url);

	
	fs.readFile(filepath, function (err, data){
		if (err){
			console.log("error: "+ err);
			handleError(err, res);
		}
		else {
		res	.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);	
		res.end(data);
		}
	})
});

var port = Number(process.env.PORT || 5000);
server.listen(port);

