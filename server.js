var express = require('express');
var expressHbs = require('express-handlebars');
var handlebars = expressHbs.create();
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){

	res.render("hey, y'all");
});

app.use('/public', express.static('public'));

app.listen(5000);