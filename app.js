var express = require('express');
var bodyParser = require('body-parser');
var db = require('mysql');
var expressValidator = require('express-validator');
var multer  = require('multer');
var upload = multer({ dest: 'webpages/images/'});
var session = require('client-sessions');
var connection = db.createConnection({
	host: 'localhost',
	user: 'root',
	password: "",
	database: "laureal"
});
var session;
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  cookieName: 'session',
  secret: 'random	req.session.canPost = user;',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use('/', express.static('webpages/'));

app.get('/api/reviews', function(req,res){
	var queryString = 'SELECT * from REVIEWS';
	connection.query(queryString, function(err, rows, fields){
		if (err)	{
			console.log(err);
			console.log("Querying error");
		}
		else{
			var reviews = JSON.stringify(rows);
			res.send(reviews);
		}
	});

});
app.post('/api/register' ,function(req, res) {

	console.log(req.body);
	var post  = {
	  UNI_PASSWORD: req.body.pass,
	  UNI_ATTEND: "default",
	  UNI_COURSE_LEVEL: 2,
	  UNI_EMAIL: req.body.email,
	  UNI_FIRST_NAME: req.body.name,
	  UNI_LAST_NAME: "default",
	};

		console.log(connection.query('INSERT INTO UNIVERSITY_USER SET ?', post, function(err, result) {
		console.log("added: ");

		}).sql);
});
app.post('/api/login', upload.single('image'), function(req, res) {
	console.log(req.body);
	var sess = req.session;
	var email = req.body.login[0];
	var password = req.body.password;
	var query = 'SELECT `UNI_EMAIL`, `UNI_PASSWORD`FROM UNIVERSITY_USER WHERE UNI_EMAIL = ?;';
	connection.query(query,email,function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(result.length === 0){
			console.log("doesn't exist");
			return res.status(404).send();
		}
		console.log(result);
		req.session.id = req.body.login[0];
		console.log("sessionCreated.");
		req.session.canPost = true;
		res.send(null);
	}).sql;
});


app.get('/api/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});


app.post('/api/createReview' ,function(req, res) {
	var date;
	date = new Date();
	date = date.getUTCFullYear() + '-' +
				('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
				('00' + date.getUTCDate()).slice(-2) + ' ' +
				('00' + date.getUTCHours()).slice(-2) + ':' +
				('00' + date.getUTCMinutes()).slice(-2) + ':' +
				('00' + date.getUTCSeconds()).slice(-2);

	console.log(req.body);
	var post  = {
	  REVIEW_TITLE: req.body.reviewTitle,
	  REVIEW_CATEGORY: "default",
	  REVIEW_DATE: date,
	  REVIEW_CONTENT: req.body.reviewContent,
	  REVIEW_STARS: 5
	};
	if(req.session.canPost){
		console.log(connection.query('INSERT INTO REVIEWS SET ?', post, function(err, result) {
		console.log("added: ");
		if(err){
			console.log(err);
			return res.status(500).send();
			}
		}).sql);
	}
	else{
		console.log("cant post");
	}
});

app.listen(3002);
console.log("connected: 3002");
