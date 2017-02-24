var express = require('express');
var bodyParser = require('body-parser');
var db = require('mysql');

var connection = db.createConnection({
	host: 'localhost',
	user: 'lau',
	password: "lau",
	database: "lau"
});

var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use('/', express.static('webpages/'))

app.get('/api/reviews', function(req,res){
	var queryString = 'SELECT * from REVIEWS'
	connection.query(queryString, function(err, rows, fields){
		if (err)
		{
			console.log("Querying error");
		}
		else
		{
			console.log(rows);
			var reviews = JSON.stringify(rows);
			res.send(reviews);
		}
		sqlConnect.connection.end();
	});

});
app.get('api/reviews2', function(req,res){
	connection.connect();

	res.json()

});
app.listen(3000);
console.log("connected: 3000");