var express = require('express');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({secret: 'kisses'}));

var handlebars = expressHbs.create({
	defaultLayout: 'main'
});
var tutorialData = require('./tutorialDataFile');


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
	res.render('login');
});

function passwordIsValid(user, pass) {
if (user === "kate" && pass === "<3") {
	return true;
} else {
	return false;
}

}

app.post('/login', function(req, res){
	var username = req.body['username'];
	var password = req.body['password'];

	if (passwordIsValid(username, password)){
		res.render('login', {loggedIn: true})
	} else {
		res.render('login', {failedLogin: true})
	}

	res.render('login');
});

app.get('/set_session', function(req, res){
	req.session.username = req.query.username;

	res.send("session was set");
	});

app.get('/see_session', function(req, res){

	res.send("session.username: " + req.session.username);
	});

app.use('/public', express.static('public'));

app.listen(process.env.PORT || 5000);










