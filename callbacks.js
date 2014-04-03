console.log('hello');
var fs = require('fs');
function didReadFile(err, data){
	if (err) {
		console.log('error!!');
	}
	else {
		console.log('file read: '+ data);
	}
}

fs.readFile('./text.txt', didReadFile);