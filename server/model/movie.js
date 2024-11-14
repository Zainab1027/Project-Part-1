const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
{
  collection: "Movies"
}

// Export the Movie model
module.exports = mongoose.model('Movie', movieSchema);
