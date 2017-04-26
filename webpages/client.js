window.onload = function(){
	retrieveReviews();
	console.log(document.cookie);
};
var registerForm = document.forms.namedItem("register");
var loginForm = document.forms.namedItem("login");
var form = document.getElementById('login');
console.log(loginForm);
var row = 1;
var output = document.getElementById("row"+row);
console.log(output);

form.addEventListener('submit',function(ev){
	console.log("Event triggered.");
	var data = new FormData(form);
	console.log(data);
	var req = new XMLHttpRequest();
	req.open("POST", '/api/login');
	req.onload = function(oEvent){
		if(req.status == 200){
			console.log("success");
		}
		else{
			console.log("fail");
			alert("Login failed: bad Username");
		}
	req.send(data);
	ev.preventDefault();
	};
});


function test(){
	var registerForm = document.forms.namedItem("register");
	var loginForm = document.forms.namedItem("login");
	var form = document.getElementById('login');
	console.log(form);
	var data = new FormData(form);
	//for (var [key, value] of data.entries()) {
  //console.log(key, value);
//}
	console.log(data);
	console.log("starting request");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/api/login');
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			if(xhr.status == 200){
				console.log("success");
				window.location.href = "index.html";
			}
			else{
				console.log("fail");
				alert("Login failed: bad Username");
			}
		}

	};
	xhr.send(data);
}

function displayReview(title,mainContent,star,newRow){
	if(!newRow){

		var reviewBox = document.createElement("div");
		reviewBox.classList.add("col-md-3");
		reviewBox.classList.add("text-center");
		var p = document.createElement("p");
		var breaki = document.createElement("br");
		p.appendChild(breaki);
		var questionBox = document.createElement("div");
		questionBox.classList.add("question-box");
		var questionBoxQuestion = document.createElement("p");
		questionBoxQuestion.setAttribute("id", "question-box-question");
		questionBoxQuestion.textContent = title;
		var questionBoxAnswer = document.createElement("p");
		questionBoxAnswer.setAttribute("id", "question-box-answer");
		questionBoxAnswer.textContent = mainContent;
		var rating = document.createElement("p");
		rating.setAttribute("id", "info-box-rating");
		rating.textContent = star + "★";

		questionBox.appendChild(questionBoxQuestion);
		questionBox.appendChild(p);
		questionBox.appendChild(p);
		questionBox.appendChild(questionBoxAnswer);
		questionBox.appendChild(rating);
		output = document.getElementById("reviewsTest")
		reviewBox.appendChild(questionBox);
		console.log(output) 
		output.appendChild(reviewBox);
	}
	else{
		row++;
		newRow = document.createElement("div");
		newRow.classList.add("row");
		newRow.setAttribute("id", "row"+row);

		var reviewBox = document.createElement("div");
		reviewBox.classList.add("col-md-3");
		reviewBox.classList.add("text-center");
		var p = document.createElement("p");
		var breaki = document.createElement("br");
		p.appendChild(breaki);
		var questionBox = document.createElement("div");
		questionBox.classList.add("question-box");
		var questionBoxQuestion = document.createElement("p");
		questionBoxQuestion.setAttribute("id", "question-box-question");
		questionBoxQuestion.textContent = title;
		var questionBoxAnswer = document.createElement("p");
		questionBoxAnswer.setAttribute("id", "question-box-answer");
		questionBoxAnswer.textContent = mainContent;
		var rating = document.createElement("p");
		rating.setAttribute("id", "info-box-rating");
		rating.textContent = star + "★";

		questionBox.appendChild(questionBoxQuestion);
		questionBox.appendChild(p);
		questionBox.appendChild(p);
		questionBox.appendChild(questionBoxAnswer);
		questionBox.appendChild(rating);
		output = document.getElementById("reviewsTest")
		reviewBox.appendChild(questionBox);
		newRow.appendChild(reviewBox);
		console.log(output) 
		output.appendChild(newRow);
	}
}
function retrieveReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/reviews');
    xhr.setRequestHeader("Content-Type", "text/xml");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
								var jsonResponse = JSON.parse(data);
								console.log(jsonResponse);
								loadReviews(jsonResponse);
            }
        }
    };
    xhr.send(null);
}
function loadReviews(reviews){
	for (var i=0; i<reviews.length; i++){
		if (i % 2==0){
		console.log(reviews[i].REVIEW_CATEGORY);
  		console.log(reviews[i].REVIEW_ID);

		displayReview(reviews[i].REVIEW_TITLE,reviews[i].REVIEW_CONTENT,reviews[i].REVIEW_STARS, true);
		}
		else{
			displayReview(reviews[i].REVIEW_TITLE,reviews[i].REVIEW_CONTENT,reviews[i].REVIEW_STARS, false);
		}
	}
}

function createReview(){

}
