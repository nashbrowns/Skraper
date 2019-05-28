const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/skraperdb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const Handlebars     = require('handlebars');
//const HandlebarsIntl = require('handlebars-intl');
const MomentHandler = require("handlebars.moment");

//HandlebarsIntl.registerWith(Handlebars);
MomentHandler.registerHelpers(Handlebars);


require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
