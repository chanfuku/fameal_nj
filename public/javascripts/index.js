var image_onclick = function (event) {
    window.alert('Hello World !');
};

var submit = function (event) {
    window.location.href="/submit";
};

var back = function (event) {
    window.location.href="/";
};

var document_onready = function (event) {
    $('.img-thumbnail').on('click', image_onclick);
    $('#submit').on('click', submit);
    $('#back').on('click', back);
};

$(document).ready(document_onready);

