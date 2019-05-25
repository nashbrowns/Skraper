var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        // Grab every document in the Events collection
        db.Event.find({})
          .then(function (dbEvent) {
            let events = {
                event: dbEvent
            };
            // If we were able to successfully find Events, send them back to the client
            res.render("../views/index", events);

          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/events/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Event.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      //.populate("note")
      .then(function(dbEvent) {

        res.render("../views/comment", dbEvent);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

}
