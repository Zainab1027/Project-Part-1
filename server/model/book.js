const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
}, {
    collection: "books"
});

module.exports = mongoose.model('Book', bookSchema);
