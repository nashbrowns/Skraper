var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var EventSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  event_date: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var Event = mongoose.model("Event", EventSchema);

// Export the Article model
module.exports = Event;
