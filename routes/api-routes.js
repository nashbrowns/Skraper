var axios = require("axios");
var cheerio = require("cheerio");
var moment = require('moment');
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
        let result = {};
        result.title = $(this)
          .children("h2")
          .children("a")
          .attr("data-tooltip");
        let date = $(this)
          .children("div.tribe-events-event-meta")
          .children("div.author")
          .children("div.tribe-single-event-details")
          .children("span.tribe-event-date-start")
          .text();

          result.event_date = date.split(" ").slice(0,2).join(" ").replace(/,/g, '');
          result.event_date = result.event_date+", "+moment().format('YYYY');
          result.event_date_month = date.split(" ").slice(0,1).join(" ").replace(/,/g, '');
          result.event_date_day = date.split(" ").slice(1,2).join(" ").replace(/,/g, '');

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

          //console.log('datePipe: '+result.event_date);

        // Create a new Event using the `result` object built from scraping
        db.Event.updateOne(result,result,{upsert: true})
          .then(function (dbEvent) {
            // View the added result in the console
            console.log(dbEvent);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });

        eventArr.push(result);
      });
    }).then(() => {
      res.json(eventArr);
    });
  });

  // A GET route for scraping the events12 website
  app.get("/scrape12", function (req, res) {

    let eventArr = [];

    // First, we grab the body of the html with axios
    axios.get("https://www.events12.com/portland/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      // Now, we grab every h2 within an Event tag, and do the following:
      $("article").each(function (i, element) {
        // Save an empty result object
        let result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h3")
          .text();

        let date = $(this)
          .children("div.date")
          .text();
        
        result.event_date = date.split(" ").slice(0,2).join(" ").replace(/,/g, '');
        result.event_date = result.event_date+", "+moment().format('YYYY');
        result.event_date_month = date.split(" ").slice(0,1).join(" ").replace(/,/g, '');
        result.event_date_day = date.split(" ").slice(1,2).join(" ").replace(/,/g, '');

        result.link = $(this)
          .children("a")
          .attr("href");

        console.log('date12: '+result.event_date_month+','+result.event_date_day);

        // Create a new Event using the `result` object built from scraping
        db.Event.updateOne(result,result,{upsert: true})
          .then(function (dbEvent) {
            // View the added result in the console
            console.log(dbEvent);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });

          eventArr.push(result);
      });

      // Send a message to the client
      //res.send("Scrape Complete");
    }).then( () => {
      res.json(eventArr);
    });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/notes/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function (dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Event.updateOne({ _id: req.params.id }, {$push: { notes: dbNote._id }});
      })
      .then(function (dbEvent) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbEvent);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

    // Route for saving/updating an Article's associated Note
    app.delete("/notes/:id", function (req, res) {
      // Create a new note and pass the req.body to the entry
      db.Note.remove({_id: req.params.id})
      .then(function (dbEvent){
        res.send(200);
      })
      .catch(function (err){
        res.json(err);
      });
    });
}