const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    published: Date,
    description: String,
    price: Number,
});

module.exports = mongoose.model('Book', bookSchema);
