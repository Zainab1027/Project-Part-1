const express = require('express');
const router = express.Router();
const Book = require('../model/book'); // Importing the Book model

// GET - Fetch and display all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
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
});

// GET - Show page to add a new book
router.get('/add', (req, res) => {
    res.render('Book/add', {
        title: 'Add Book'
    });
});

// POST - Add a new book to the database
router.post('/add', async (req, res) => {
    try {
        const { Name, Author, Published, Description, Price, ISBN } = req.body;
        const newBook = new Book({
            Name,
            Author,
            Published,
            Description,
            Price,
            ISBN
        });
        await newBook.save(); // Save the new book to MongoDB
        res.redirect('/books'); // Redirect to book list after adding
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).render('Book/add', {
            title: 'Add Book',
            error: 'Failed to add book. Ensure all fields are valid and ISBN is unique.'
        });
    }
});

// GET - Show page to edit a book
router.get('/edit/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Find book by ID
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
});

// POST - Update a book in the database
router.post('/edit/:id', async (req, res) => {
    try {
        const { Name, Author, Published, Description, Price, ISBN } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { Name, Author, Published, Description, Price, ISBN },
            { new: true } // Return the updated book document
        );

        if (!updatedBook) {
            return res.status(404).render('Book/edit', {
                title: 'Edit Book',
                error: 'Book not found.'
            });
        }
        res.redirect('/books'); // Redirect to the book list after updating
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).render('Book/edit', {
            title: 'Edit Book',
            error: 'Failed to update book. Please try again.'
        });
    }
});

// GET - Delete a book from the database
router.get('/delete/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Confirm book exists
        if (!book) {
            return res.status(404).render('Book/list', {
                title: 'Books',
                error: 'Book not found.'
            });
        }

        await Book.findByIdAndRemove(req.params.id); // Delete book by ID
        res.redirect('/books'); // Redirect to book list after deletion
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).render('Book/list', {
            title: 'Books',
            error: 'Error deleting book. Please try again.'
        });
    }
});

module.exports = router;
