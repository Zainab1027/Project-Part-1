const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: Number
}, {
    collection: 'books'
});

module.exports = mongoose.model('Book', bookSchema);
