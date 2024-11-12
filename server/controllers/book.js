const Book = require('../model/book');

// Display all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('Book/list', { title: 'Books', BookList: books });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Failed to load books' });
    }
};

// Show add book form
exports.showAddBookForm = (req, res) => {
    res.render('Book/add', { title: 'Add New Book' });
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.redirect('/books');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Failed to add book' });
    }
};

// Show edit book form
exports.showEditBookForm = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('Book/edit', { title: 'Edit Book', book });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Failed to load edit form' });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/books');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Failed to update book' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('/books');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Failed to delete book' });
    }
};

