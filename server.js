var express = require('express');
var expressHbs = require('express3-handlebars');
var handlebars = expressHbs.create({
	defaultLayout: 'main'
});
var tutorialData = require('./tutorialDataFile');
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	var data = {planet: "earth"};
	var planetNames =  [
	'mars',
	'venus'
	];
	data.planetNames = planetNames;
	res.render('index', data);
});

app.get('/tutorial/:tutorialName', function(req, res){
	var tutorialName = req.params.tutorialName;
	//look up data about tutorialName
	var data = tutorialData[tutorialName];

	res.render('tutorial', data);
});

app.get('/browse', function(req, res){
	var data = {planet: "earth"};
	res.render('browse', data);
});

app.use('/public', express.static('public'));

app.listen(5000);