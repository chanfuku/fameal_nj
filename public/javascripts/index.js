var submit = function (event) {
    window.location.href="/submit";
};

var back = function (event) {
    window.location.href="/input";
};

var document_onready = function (event) {
    $('#submit').on('click', submit);
    $('#back').on('click', back);
};

$(document).ready(document_onready);

