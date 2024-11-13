const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviecontroller'); // Change to movieController

// Routes
router.get('/', movieController.getAllMovies);  // Get all movies
router.get('/add', movieController.showAddMovieForm);  // Show add movie form
router.post('/add', movieController.addMovie);  // Handle movie addition
router.get('/edit/:id', movieController.showEditMovieForm);  // Show edit movie form
router.post('/edit/:id', movieController.updateMovie);  // Handle movie update
router.get('/delete/:id', movieController.deleteMovie);  // Handle movie deletion

module.exports = router;
