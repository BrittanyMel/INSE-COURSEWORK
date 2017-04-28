// retrieve reviews loads the topics and reviews when they are needed.
retrieveReviews();
retrievetopics();
// local Storage is used to keep track of the current page we are on when the dynamic content is being generated.
var myStorage = localStorage;
generateUniPage();
document.getElementById("createReview").addEventListener("click", createReview,false);
document.getElementById("submitTopic").addEventListener("click", createTopic,false);
// This if statment changes the values in the login box to a different set if the user is logged in.
if(localStorage.getItem('id') !== null){
		document.getElementById("loginBox1").innerHTML = "";
		var logoutButton = document.createElement('a');
		logoutButton.setAttribute('src','/api/logout')
		document.getElementById("loginBox1").appendChild(logoutButton);
	}
localStorage.setItem('uni', 1);
localStorage.setItem('cat', 1);
window.onload = function(){
	retrieveReviews();

	if(window.location.pathname==="/accountsettings.html"){

		getAccountSettings();
	}

}
// gets the data from the client and posts it to the server when the client is registering
var registerForm = document.forms.namedItem("register");
var loginForm = document.forms.namedItem("login");
var form = document.getElementById('login');

var row = 1;
var output = document.getElementById("row"+row);


form.addEventListener('submit',function(ev){

	var data = new FormData(form);

	var req = new XMLHttpRequest();
	req.open("POST", '/api/login');
	req.onload = function(oEvent){
		if(req.status == 200){

		}
		else{

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

	var data = new FormData(form);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/api/login');
	xhr.onreadystatechange = function(e){
		if (xhr.readyState == 4) {
			if(xhr.status == 200){

				window.location.href = "index.html";
				var jsonResponse = JSON.parse(xhr.responseText);

				localStorage.setItem('id', jsonResponse);


			}
			else{
				alert("Login failed: bad Username");
			}
		}

	};
	xhr.send(data);
}
// Displays teh reviews creates the HTML CONTENT. and appends it to the page so that it is displayed.
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

		newOutput.appendChild(newRow);
	}
}
// makes a get request to the server to query for all reviews.
function retrieveReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/reviews');
    xhr.setRequestHeader("Content-Type", "text/xml");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
								var jsonResponse = JSON.parse(data);
								loadReviews(jsonResponse);
            }
        }
    };
    xhr.send(null);
}
//loops through the retrieved reviews and displays them one by one. The modulus if statement in there makes it so there is only 2 reviews on
// on there at a given time.
function loadReviews(reviews){
	for (var i=0; i<reviews.length; i++){
		if (i % 2==0){
			displayReview(reviews[i].REVIEW_TITLE,reviews[i].REVIEW_CONTENT,reviews[i].REVIEW_STARS, true);
		}
		else{
			displayReview(reviews[i].REVIEW_TITLE,reviews[i].REVIEW_CONTENT,reviews[i].REVIEW_STARS, false);
		}
	}
}
// gets the account settings posts the users ids.
function getAccountSettings(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/accountSettings');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							updateAccountSettings(jsonResponse);
					}
			}
	};
	xhr.send(JSON.stringify(localStorage.getItem('id')));

}


// creates a topic
function createTopic(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/createTopic');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							updateAccountSettings(jsonResponse);
					}
			}
	};
	xhr.send(JSON.stringify(localStorage.getItem('id')));

}
// posts the uni id currently in use so that the correct information can be displayed on  the dynamic page.
function generateUniPage(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/getUniPage');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);
							var title = document.getElementById("uniTitle")
							title.innerHTML = jsonResponse[0].UNIVERSITY_NAME;

					}
			}
	};
	var id = {id:localStorage.getItem('uni')}
	xhr.send(JSON.stringify(id));

}
// posts the category id currently in use so that the correct information can be displayed on  the dynamic page.
function generateCategoryPage(catType){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/getCategoryPage');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
					if (xhr.status == 200) {
							var data = xhr.responseText;
							var jsonResponse = JSON.parse(data);

		
					}
			}
	};
	var info = {id:localStorage.getItem('uni'),
			  catType: catType}

	xhr.send(JSON.stringify(info));

}

//createReview function gets form data and sends a xmlHttprequest to the server to be added to the database.
function createReview(){
	var reviewContent = document.getElementById("reviewBox");
	var reviewTitle = document.getElementById("reviewTitle");
	var reviewForm = document.forms.namedItem("createReviews");
	var form = document.getElementById('createReviews');

	var formData = {
		reviewContent: reviewContent.value,
		reviewTitle: reviewTitle.value,
		reviewer: localStorage.getItem("id"),
		cat: localStorage.getItem("cat"),
		uniId: localStorage.getItem("uni")
	};

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/api/createReview');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(e){
		if (xhr.readyState == 4) {
			if(xhr.status == 200){
				var jsonResponse = JSON.parse(xhr.responseText);

			}
			else{
				alert("Error: You are not logged in");
			}
		}

	};
	xhr.send(JSON.stringify(formData));
}
// displays the topics on the pages much like displayReviews.
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

}
// retrieves thes current pages topics from the server and parses it to loadTopics function
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
				loadTopics(jsonResponse)
            }
        }
    };
    xhr.send(JSON.stringify(data));
}
// posts the newly created topic to the server so that i can be added
function createTopic(){
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

				
            }
        }
    };
    xhr.send(data);

}
// loops through the topics one by one and displays them
function loadTopics(topics){
	for (var i=0; i<topics.length; i++){
		displayTopic(topics[i].TOPIC_Name);
}
}