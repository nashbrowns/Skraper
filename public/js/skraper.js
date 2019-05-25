// Grab the articles as a json
$.ajax("/scrapePipe", function (data) {
  type: "GET"
  console.log(data);
});

$.ajax("/scrape12", function (data) {
  type: "GET"
  console.log(data);
});

$(document).ready(function () {

    // Grab the articles as a json
    $.ajax("/", function (data) {
      type: "GET"

      console.log(data);
    });

    $(document).on("click", "#savenote", function () {
      event.preventDefault();
      // Grab the id associated with the article from the submit button
      var thisId = $(this).attr("data-id");

      console.log($('#titleinput').val());
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "POST",
        url: "/notes/" + thisId,
        data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
        }
      })
        // With that done
        .then(function (data) {
          // Log the response
          console.log(data);

          location.reload();

        });

      // Also, remove the values entered in the input and textarea for note entry
      $("#titleinput").val("");
      $("#bodyinput").val("");
    });
  
});
