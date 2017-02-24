function loadReviews(){
	var output = window.container.reviews;
	for(var i=0; i<5;i++){
		var output = window.container.reviews;
		var reviewBox = document.createElement("div");
		reviewBox.classList("review-box");

		var breaki = document.createElement("p");
		breaki.createTextNode('br />');

		var questionBoxQuestion = document.createElement("p");
		questionBoxQuestion.setAttribute("id", "question-box-question");
		questionBoxQuestion.textContent = "test";

		var questionBoxAnswer = document.createElement("p");
		questionBoxAnswer.setAttribute("id", "question-box-answer");
		questionBoxAnswer.textConent = "testing";

		var rating = document.createElement("p");
		rating.setAttribute("id", "info-box-rating");
		rating.textContent = "3★";

		reviewBox.appendChild(questionBoxQuestion);
		reviewBox.appendChild(breaki);
		reviewBox.appendChild(questionBoxAnswer);
		reviewBox.appendChild(rating);
		output.appendChild(reviewBox);
	}
}
// <div class="review-box">
//       <p id="question-box-question">Great student accommodation</p>
//       <p><br /></p>
//       <p><br /></p>
//       <p id="question-box-answer">Had a great time in this hall, would reccommend to anyone!</p>
//       <p id="info-box-rating">5★</p>
//     </div>
//     <div class="review-box">
//       <p id="question-box-question">Loud, dirty halls</p>
//       <p><br /></p>
//       <p><br /></p>
//       <p id="question-box-answer">
//         This hall is right next to the clubs and is subject <br />
//         to an incredible amount of noise pollution! If you want to <br />
//         be able to sleep, find a different hall!
//       </p>
//       <p id="info-box-rating">3★</p>
//     </div>
//     <div class="review-box">
//       <p id="question-box-question">Good location but expensive laundry</p>
//       <p><br /></p>
//       <p><br /></p>
//       <p id="question-box-answer">
//         Why do I have to pay an arm and a leg to be clean damnit
//       </p>
//       <p id="info-box-rating">4★</p>
//     </div>