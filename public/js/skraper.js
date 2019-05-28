$(document).ready(function () {

  var DateFormats = {
    short: "MMMM DD",
    long: "dddd DD.MM.YYYY HH:mm"
  };

  Handlebars.registerHelper("formatDate", function (datetime, format) {

    // Use UI.registerHelper..
    UI.registerHelper("formatDate", function (datetime, format) {
      if (moment) {
        // can use other formats like 'lll' too
        format = DateFormats[format] || format;
        return moment(datetime).format(format);
      }
      else {
        return datetime;
      }
    });
  });

  // Grab the articles as a json
  $.get("/", function (data) {
    console.log("Welcome to Skraper!");
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

  $(document).on('click', '#deletenote', function () {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "DELETE",
      url: "/notes/" + thisId
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);

        location.reload();

      });
  });

  $(document).on('click', '#skrape', function () {
    event.preventDefault();

    console.log('scraping data...');

    $.when(scrape12(), scrapePipe()).done(function () {
      $.get("/scrape12", function (data) {
        //console.log(data);
      });
    });

  });

  let scrape12 = function () {
    return $.get("/scrape12", function (data) {
      console.log(data);
    });
  }

  let scrapePipe = function () {
    return $.get("/scrapePipe", function (data) {
      console.log(data);
    });
  }

});
