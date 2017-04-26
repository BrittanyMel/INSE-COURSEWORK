window.onload = function(){
	retrieveReviews();
	console.log(document.cookie);
};


function test(){
	var registerForm = document.forms.namedItem("register");
	var loginForm = document.forms.namedItem("login");
	data = new FormData(loginForm);
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
	};
	req.send(data);
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
								var jsonResponse = JSON.parse(xhr.responseText);
								console.log(jsonResponse);
								loadReviews(jsonResponse);
            }
        }
    };
    xhr.send(null);
}
function loadReviews(reviews){
	for (var i=0; i<reviews.length; i+2){
		console.log(reviews[i].REVIEW_CATEGORY);
  	console.log(reviews[i].REVIEW_ID);

		displayReview(reviews[i].REVIEW_TITLE,reviews[i].REVIEW_CONTENT,reviews[i].REVIEW_STARS);
	}
}
