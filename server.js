var express = require('express');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://kate:Pass245890@ds047437.mongolab.com:47437/funguys";

var cloudinary = require('cloudinary');

var app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret: 'kisses', 
	store: new MongoStore({url: mongoUrl})
}));

var handlebars = expressHbs.create({
	defaultLayout: 'main'
});
var tutorialData = require('./tutorialDataFile');

cloudinary.config({ 
  cloud_name: 'df28qohur', 
  api_key: '282897893732337', 
  api_secret: 'MmdlYxlOmozAjH4sQZmNvPT78gs' 
});


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
	//var data = tutorialData[tutorialName];



	var tutorials = req.query.tutorials;

	var collection = db.collection('tutorials');

	collection.find({}).toArray(function(err, items){
		
		if (items.length > 0) { 
			var item = items[0];
			res.render('tutorial', {objects: items});
		} else {
			res.send("nothing :(");
		}
	});

	//res.render('tutorial', data);
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

var db;

app.get('/database', function(req, res){
	var username = req.query.username;
	var status = req.query.status;

	var collection = db.collection('test_insert');

	collection.insert({username: username, status: status}, function(err, count){
		if (err){
			console.log("error: " + err);
		}

		res.send('the count is: ' + count);
	});
});

app.get('/read_database', function(req, res){
	var username = req.query.username;

	var collection = db.collection('test_insert');

	collection.find({username: username}).toArray(function(err, items){
		
		if (items.length > 0) { 
			var item = items[0];
			res.send("The user is: " + item.status);
		} else {
			res.send("nothing :(");
		}
	});

});

MongoClient.connect(mongoUrl, function(err, _db){
	if (err) {
		console.log("error: " + err);
	}	

	db = _db;

	console.log("connected to mongo!!!");
	app.listen(process.env.PORT || 5000);
});











