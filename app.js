var express = require('express');
var bodyParser = require('body-parser');
var db = require('mysql');
var expressValidator = require('express-validator');
var multer  = require('multer');
var upload = multer({ dest: 'webpages/images/'});
var session = require('client-sessions');



// create connection to sql server
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

// bodyParser middleware so request can be read as a json object
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  cookieName: 'session',
  secret: 'random	req.session.canPost = user;',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


//serve static content
app.use('/', express.static('webpages/'));


// endpoint used for getting all of the reviews, queries the database
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

// endpoint used to insert a new user to the database
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

// endpoint used to verify login and log people in
app.post('/api/login', upload.single('image'), function(req, res) {
	console.log(req.body);
	var sess = req.session;
	var email = req.body.login[0];
	var password = req.body.password;
	var query = 'SELECT `UNI_ID`, `UNI_EMAIL`, `UNI_PASSWORD`FROM UNIVERSITY_USER WHERE UNI_EMAIL = ?;';
	connection.query(query,email,function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(result.length === 0){
			console.log("doesn't exist");
			return res.status(404).send();
		}
		console.log(result[0].UNI_ID);
		console.log(result);
		req.session.id = req.body.login[0];
		console.log("sessionCreated.");
		req.session.canPost = true;
		var reviews = JSON.stringify(result[0].UNI_ID);
		res.send(reviews);
	}).sql;
});

//endpoint to edit account Settings its retreives the users data from the database and then sends to client/
app.post('/api/accountSettings', upload.single('image'), function(req, res) {
	console.log(req.body)
	var query = 'SELECT `UNI_ID`, `UNI_EMAIL`, `UNI_PASSWORD`, FROM UNIVERSITY_USER WHERE UNI_ID = ?;';
	connection.query(query,id,function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(result.length === 0){
			console.log("doesn't exist");
			return res.status(404).send();
		}
		var details = JSON.stringify(result);
		res.send(details);
	}).sql;
});


// endpoint to logout. destroys the session and redirects to index page
app.get('/api/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

// endpoint used to insert a newly created review.
app.post('/api/createReview' ,function(req, res) {
	console.log(req.body)
	var date;
	date = new Date();
	date = date.getUTCFullYear() + '-' +
				('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
				('00' + date.getUTCDate()).slice(-2) + ' ' +
				('00' + date.getUTCHours()).slice(-2) + ':' +
				('00' + date.getUTCMinutes()).slice(-2) + ':' +
				('00' + date.getUTCSeconds()).slice(-2);

	// json object created so SET could be used when inserting into the database for ease
	// of access
	var post  = {
	  REVIEW_TITLE: req.body.reviewTitle,
	  REVIEW_CATEGORY: "default",
	  REVIEW_DATE: date,
	  REVIEW_CONTENT: req.body.reviewContent,
	  REVIEW_STARS: 4,
	  REVIEWER: req.body.reviewer,
	  CATEGORY_ID: req.body.cat,
	  UNIVERSITY_ID: req.body.uniId
	};
	console.log(post)

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
			return res.status(300).send();
		console.log("cant post");
	}
});


// endpoint returns the current uni page.
app.post('/api/getUniPage', upload.single('image'), function(req, res) {
	console.log(req.body.id);
	var query = 'SELECT UNIVERSITY_NAME FROM University WHERE UNIVERSITY_ID = ?;';
	connection.query(query,req.body.id,function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(result.length === 0){
			console.log("doesn't exist");
			return res.status(404).send();
		}
		var details = JSON.stringify(result);
		res.send(details);
	}).sql;
});


// endpoint returns the current category page.
app.post('/api/getCategoryPage', upload.single('image'), function(req, res) {
	console.log(req.body.id);
	var query = 'SELECT UNIVERSITY_NAME FROM CATEGORIES WHERE CATEGORY_UNIVERSITY = ?;';
	connection.query(query,req.body.id,function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(result.length === 0){
			console.log("doesn't exist");
			return res.status(404).send();
		}
		var details = JSON.stringify(result);
		res.send(details);
	}).sql;
});
// Endpoint to insert a topic into the database.
app.post('/api/createTopic', upload.single('image'), function(req, res) {
	console.log(req.body);
	var post = {TOPIC_NAME: req.body.name}
	var query = 'INSERT INTO TOPICS SET ?';
	connection.query(query,post,function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(result.length === 0){
			console.log("doesn't exist");
			return res.status(404).send();
		}
		var details = JSON.stringify(result);
		res.send(details);
	}).sql;
});
// Endpoint to query the database for all topics.
app.post('/api/topics', function(req,res){
	console.log(req.body)
	var queryString = 'SELECT * from TOPIC WHERE UNIVERSITY_ID = ?';
	connection.query(queryString, req.body.uniId, function(err, rows, fields){
		if (err)	{
			console.log(err);
			console.log("Querying error");
		}
		else{
			var reviews = JSON.stringify(rows);
			console.log(reviews);
			res.send(reviews);
		}
	})

});
//
app.listen(3000);
console.log("connected: 3000");