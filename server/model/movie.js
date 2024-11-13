const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    year: Number,
    description: String,
    rating: Number
}, {
    collection: 'movies'
});

module.exports = mongoose.model('Movie', movieSchema);
