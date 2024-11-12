const Book = require('../model/book');

// Fetch all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('Book/list', { title: 'Books', BookList: books });
    } catch (error) {
        res.status(500).send('Error retrieving books');
    }
};

// Add a new book
exports.showAddBookForm = (req, res) => {
    res.render('Book/add', { title: 'Add New Book' });
};

exports.addBook = async (req, res) => {
    const { name, author, published, description, price } = req.body;
    try {
        await Book.create({ name, author, published, description, price });
        res.redirect('/books');
    } catch (error) {
        res.status(500).send('Error adding book');
    }
};

// Edit book
exports.showEditBookForm = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('Book/edit', { title: 'Edit Book', book });
    } catch (error) {
        res.status(404).send('Book not found');
    }
};

exports.updateBook = async (req, res) => {
    const { name, author, published, description, price } = req.body;
    try {
        await Book.findByIdAndUpdate(req.params.id, { name, author, published, description, price });
        res.redirect('/books');
    } catch (error) {
        res.status(500).send('Error updating book');
    }
};

// Delete book
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('/books');
    } catch (error) {
        res.status(500).send('Error deleting book');
    }
};

