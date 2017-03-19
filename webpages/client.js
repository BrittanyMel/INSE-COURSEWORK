window.onload = retrieveReviews();

var registerForm = document.forms.namedItem("register");
var loginForm = document.forms.namedItem("login");
var form = document.getElementById('login');
console.log(loginForm);

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


function displayReview(title,mainContent,star){

	var output = document.getElementById('reviewsTest');
	var reviewBox = document.createElement("div");
	reviewBox.classList.add("review-box");
	var p = document.createElement("p");
	var breaki = document.createElement("br");
	p.appendChild(breaki);
	var questionBoxQuestion = document.createElement("p");
	questionBoxQuestion.setAttribute("id", "review-box-title");
	questionBoxQuestion.textContent = title;
	var questionBoxAnswer = document.createElement("p");
	questionBoxAnswer.setAttribute("id", "review-box-answer");
	questionBoxAnswer.textContent = mainContent;
	var rating = document.createElement("p");
	rating.setAttribute("id", "info-box-rating");
	rating.textContent = star + "★";

	reviewBox.appendChild(questionBoxQuestion);
	reviewBox.appendChild(p);
	reviewBox.appendChild(p);
	reviewBox.appendChild(questionBoxAnswer);
	reviewBox.appendChild(rating);
	output.appendChild(reviewBox);
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
		console.log(reviews[i].REVIEW_CATEGORY);
  	console.log(reviews[i].REVIEW_ID);

		displayReview(reviews[i].REVIEW_TITLE,reviews[i].REVIEW_CONTENT,reviews[i].REVIEW_STARS);
	}
}

function createReview(){

}
