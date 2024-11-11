const Book = require('../model/book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('Book/list', { title: 'Books', BookList: books });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).render('Book/list', { title: 'Books', error: 'Failed to load books' });
    }
};

// Show form to add a new book
exports.showAddBookForm = (req, res) => {
    res.render('Book/add', { title: 'Add Book' });
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const { name, author, published, description, price } = req.body;
        const newBook = new Book({ name, author, published, description, price });
        await newBook.save();
        res.redirect('/books');
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).render('Book/add', { title: 'Add Book', error: 'Failed to add book' });
    }
};

// Show form to edit a book
exports.showEditBookForm = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('Book/edit', { title: 'Edit Book', Book: book });
    } catch (error) {
        console.error("Error loading edit page:", error);
        res.status(500).send('Error loading edit page');
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const { name, author, published, description, price } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { name, author, published, description, price });
        res.redirect('/books');
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).render('Book/edit', { title: 'Edit Book', error: 'Failed to update book' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('/books');
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send('Error deleting book');
    }
};
