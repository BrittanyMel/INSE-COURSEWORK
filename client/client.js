'use strict'

function myFunction() {
    var elements = document.getElementById("signup").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

     JSON.stringify(obj);
}
var xhr = new XMLHttpRequest();
xhr.open('POST', '/login_page');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
}
xhr.send(JSON.stringify(obj));

}

function createReviews() {
    var elements = document.getElementById("createReview").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

     console.log(JSON.stringify(obj));
}
var xhr = new XMLHttpRequest();
xhr.open('POST', '/create_review');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
}
xhr.send(JSON.stringify(obj));

}