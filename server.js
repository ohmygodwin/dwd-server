var express = require('express');
var expressHbs = require('express3-handlebars');
var bodyParser = require('body-parser');

//app.use(bodyParser());

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

	//var id = req.query.id;
	//res.render("people", {id: id})

	//look up data about tutorialName
	var data = tutorialData[tutorialName];

	res.render('tutorial', data);
});

app.get('/browse', function(req, res){
	var data = {planet: "earth"};
	res.render('browse', data);
});

app.get('/login', function(req, res){
	res.render("login");
});

app.post('/login', function(req, res){
	res.render('login');
});

app.use('/public', express.static('public'));

app.listen(process.env.PORT || 5000);





