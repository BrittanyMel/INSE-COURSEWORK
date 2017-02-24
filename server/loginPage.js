'use strict'
/ declare the two variables that will be used
var xhr = new XMLHttpRequest();

xhr.onload = function () {
   var data = JSON.parse( xhr.responseText );
   var targetList = document.getElementById("lecturers");
   for (var i of data) {
     	var li = document.createElement("li");
     	li.textContent = i;
       targetList.appendChild(li);
   }
};

xhr.open("POST", "../server/api/server.js");
xhr.send(JSON.stringify();
xhr.send();

