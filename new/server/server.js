var express = require('express');
var bodyParser = require('body-parser');
var db = require('mysql');

var connection = db.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Samuel*123456',
  database : 'fuck'
});


var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use('/', express.static('../webpages', { extensions: ['html']}));

app.get('/reviews', function(req,res){
	res.send('testing');
});

app.post('/login_page' ,function(req, res) {
	
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
console.log("added: ")
}).sql);
});

app.post('/create_review' ,function(req, res) {
	
	console.log(req.body);
	var posti  = {
	REVIEW_ID: 1,		
	REVIEW_QTY: 2,
	REVIEW_CATEGORY: "default",
	REVIEW_CONTENT: req.body.reviewbox
	};


console.log(connection.query('INSERT INTO REVIEWS SET ?', posti, function(err, result) {
console.log("added: ")
}).sql);
}


);
app.post('/api/reviews')
function displayReviews(reviewType){
    queryString = 'SELECT * FROM REVIEWS WHERE meta_key = ?';
    key= 'REVIEW_CATEGORY';
    connection.query(queryString, key, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log(rows[i]);
    }
});

}

app.listen(3000);
console.log('API is running on port 3000');


