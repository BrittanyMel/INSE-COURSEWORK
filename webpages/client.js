var myStorage = localStorage;
generateUniPage();
document.getElementById("createReview").addEventListener("click", createReview,false);
document.getElementById("submitTopic").addEventListener("click", createTopic,false);
localStorage.setItem('uni', 1);
localStorage.setItem('cat', 1);
window.onload = function(){
	retrieveReviews();
	console.log(window.location.pathname);
	if(window.location.pathname==="/accountsettings.html"){
		console.log("it is");
		getAccountSettings();

	}
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
	xhr.onreadystatechange = function(e){
		if (xhr.readyState == 4) {
			if(xhr.status == 200){
				console.log("success");
				window.location.href = "index.html";
				var jsonResponse = JSON.parse(xhr.responseText);
				console.log(jsonResponse);
				localStorage.setItem('id', jsonResponse);
				console.log(localStorage);

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
	if(newRow === false){

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
		var newOutput = document.getElementById("reviewsTest")
		reviewBox.appendChild(questionBox);
		newRow.appendChild(reviewBox);
		console.log(output);
		newOutput.appendChild(newRow);
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

function getAccountSettings(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/accountSettings');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							console.log(jsonResponse);
							updateAccountSettings(jsonResponse);
					}
			}
	};
	console.log(localStorage.getItem('id'))
	xhr.send(JSON.stringify(localStorage.getItem('id')));

}
// gets account settings.
function updateAccountSettings(details){
	console.log(details);
}


function createTopic(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/createTopic');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							console.log(jsonResponse);
							updateAccountSettings(jsonResponse);
					}
			}
	};
	console.log(localStorage.getItem('id'))
	xhr.send(JSON.stringify(localStorage.getItem('id')));

}

function generateUniPage(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/getUniPage');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							console.log(jsonResponse[0].UNIVERSITY_NAME);
							var title = document.getElementById("uniTitle")
							title.innerHTML = jsonResponse[0].UNIVERSITY_NAME;
							console.log(title)
					}
			}
	};
	var id = {id:localStorage.getItem('uni')}
	console.log(JSON.stringify(localStorage.getItem('uni')));
	xhr.send(JSON.stringify(id));

}

function generateCategoryPage(catType){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/getCategoryPage');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							console.log(jsonResponse[0]);

		
					}
			}
	};
	var info = {id:localStorage.getItem('uni'),
			  catType: catType}
	console.log(JSON.stringify(localStorage.getItem('uni')));
	xhr.send(JSON.stringify(info));

}

//createReview function gets form data and sends a xmlHttprequest to the server to be added to the database.
function createReview(){
	var reviewContent = document.getElementById("reviewBox");
	var reviewTitle = document.getElementById("reviewTitle");
	console.log("Called");
	var reviewForm = document.forms.namedItem("createReviews");
	var form = document.getElementById('createReviews');
	console.log(reviewContent.value);
	var formData = {
		reviewContent: reviewContent.value,
		reviewTitle: reviewTitle.value,
		reviewer: localStorage.getItem("id"),
		cat: localStorage.getItem("cat"),
		uniId: localStorage.getItem("uni")
	};
	console.log(formData);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/api/createReview');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(e){
		if (xhr.readyState == 4) {
			if(xhr.status == 200){
				console.log("success");
				var jsonResponse = JSON.parse(xhr.responseText);
				console.log(jsonResponse);

			}
			else{
				console.log("fail");
				console.log(formData)
			}
		}

	};
	xhr.send(JSON.stringify(formData));
}

function displayTopic(topic){
	//document.location.href = newUrl;
	var topics = document.getElementById("topics");
	var reviewBox = document.createElement("div");
	reviewBox.classList.add("info-box");
	reviewBox.classList.add("text-center");
	var img = document.createElement('img');
	img.setAttribute('src',"images/uop-img.png")
	img.setAttribute('id',"info-box-img");
	var anchor = document.createElement('a');
	anchor.innerHTML = topic;
	anchor.setAttribute('id','info-box-title');
	var secondAnchor = document.createElement('a');
	reviewBox.appendChild(img);
	reviewBox.appendChild(anchor);
	secondAnchor.innerHTML="Click this page to find out more information or to leave your own review!"
	secondAnchor.setAttribute('id','info-box-subtext');

	reviewBox.appendChild(secondAnchor);
	topics.appendChild(reviewBox);
	console.log("done");

}
function retrievetopics() {
	var data = {
		uniId: localStorage.getItem('uni')
	}
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/topics');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
				var jsonResponse = JSON.parse(data);
				console.log(jsonResponse);
				loadTopics(jsonResponse)
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

function createTopic(){
	console.log("called");
	var tName = document.getElementById("topicName").value;
	var data = {name: tName,
				uniId: localStorage.getItem('uni')}
	var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/createtopic');
    xhr.setRequestHeader("Content-Type", "text/xml");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
				var jsonResponse = JSON.parse(data);

				console.log(jsonResponse);
            }
        }
    };
    xhr.send(data);

}
function loadTopics(topics){
	for (var i=0; i<topics.length; i++){
		console.log(topics[0].TOPIC_NAME);
		displayTopic(topics[i].TOPIC_Name);
}
}