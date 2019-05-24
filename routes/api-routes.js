var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

module.exports = function (app) {

  // A GET route for scraping the pdxpipeline website
  app.get("/scrapePipe", function (req, res) {
    // First, we grab the body of the html with axios

    let eventArr = [];

    axios.get("https://www.pdxpipeline.com/events/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      $("div.event-details").each(function (i, element) {
        var result = {};
        result.title = $(this)
          .children("h2")
          .children("a")
          .attr("data-tooltip");
        result.event_date = $(this)
          .children("div.tribe-events-event-meta")
          .children("div.author")
          .children("div.tribe-single-event-details")
          .children("span.tribe-event-date-start")
          .text();
        result.link = $(this)
          .children("h2")
          .children("a")
          .attr("href");
        result.img = $(this)
          .parent()
          .children("div.event-thumb")
          .children("a")
          .children("img")
          .attr("src");

        // Create a new Event using the `result` object built from scraping
        db.Event.create(result)
          .then(function (dbEvent) {
            // View the added result in the console
            //console.log(dbEvent);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });

        eventArr.push(result);
      });
    }).then( () => {
      res.json(eventArr);
    });
  });

  // A GET route for scraping the events12 website
  app.get("/scrape12", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.events12.com/portland/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      // Now, we grab every h2 within an Event tag, and do the following:
      $("article").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h3")
          .text();
        result.event_date = $(this)
          .children("div.date")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");


        // Create a new Event using the `result` object built from scraping
        db.Event.create(result)
          .then(function (dbEvent) {
            // View the added result in the console
            console.log(dbEvent);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
}