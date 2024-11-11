const express = require('express');
const router = express.Router();
const Book = require('../model/book');

// Get all books (basic)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('Book/list', { title: 'Book List', BookList: books });
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
});

module.exports = router;
