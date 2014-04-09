var express = require('express');
var expressHbs = require('express3-handlebars');
var handlebars = expressHbs.create();
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){

	res.render('index');
});

app.use('/public', express.static('public'));

app.listen(5000);