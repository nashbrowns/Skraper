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

}
