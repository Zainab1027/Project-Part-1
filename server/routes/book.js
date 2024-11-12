const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.get('/', bookController.getAllBooks);
router.get('/add', bookController.showAddBookForm);
router.post('/add', bookController.addBook);
router.get('/edit/:id', bookController.showEditBookForm);
router.post('/edit/:id', bookController.updateBook);
router.get('/delete/:id', bookController.deleteBook);

module.exports = router;
