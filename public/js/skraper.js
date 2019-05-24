$(document).ready(function() {


    // Grab the articles as a json
    $.ajax("/", function (data) {
        type: "GET"

        console.log(data);
    }).then(function(){
        //null
    });
});
