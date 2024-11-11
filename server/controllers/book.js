const Book = require('../model/book'); // Import the Book model

// Controller to fetch all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('Book/list', {
            title: 'Books',
            BookList: books
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).render('Book/list', {
            title: 'Books',
            error: 'Unable to retrieve books. Please try again later.'
        });
    }
};

// Controller to show the add book form
exports.showAddBookForm = (req, res) => {
    res.render('Book/add', {
        title: 'Add Book'
    });
};

// Controller to add a new book
exports.addBook = async (req, res) => {
    try {
        const { Name, Author, Published, Description, Price } = req.body;
        const newBook = new Book({
            Name,
            Author,
            Published,
            Description,
            Price
        });
        await newBook.save();
        res.redirect('/bookslist');
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).render('Book/add', {
            title: 'Add Book',
            error: 'Failed to add book. Ensure all fields are valid.'
        });
    }
};

// Controller to show the edit book form
exports.showEditBookForm = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).render('Book/edit', {
                title: 'Edit Book',
                error: 'Book not found.'
            });
        }
        res.render('Book/edit', {
            title: 'Edit Book',
            Book: book
        });
    } catch (error) {
        console.error("Error loading edit page:", error);
        res.status(500).render('Book/edit', {
            title: 'Edit Book',
            error: 'Error loading edit page. Please try again.'
        });
    }
};

// Controller to update a book
exports.updateBook = async (req, res) => {
    try {
        const { Name, Author, Published, Description, Price } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { Name, Author, Published, Description, Price },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).render('Book/edit', {
                title: 'Edit Book',
                error: 'Book not found.'
            });
        }
        res.redirect('/bookslist');
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).render('Book/edit', {
            title: 'Edit Book',
            error: 'Failed to update book. Please try again.'
        });
    }
};

// Controller to delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).render('Book/list', {
                title: 'Books',
                error: 'Book not found.'
            });
        }
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('/bookslist');
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).render('Book/list', {
            title: 'Books',
            error: 'Error deleting book. Please try again.'
        });
    }
};
