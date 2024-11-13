const express = require('express');
const router = express.Router();  // Use Router, not app

// Define routes for your app
router.get('/', (req, res) => res.render('index', { title: 'Home' }));
router.get('/movies', (req, res) => res.render('movies', { title: 'Movies List' })); // Display all movies
router.get('/movies/add', (req, res) => res.render('add', { title: 'Add New Movie' })); // Add new movie
router.get('/movies/edit/:id', (req, res) => res.render('edit', { title: 'Edit Movie' })); // Edit movie based on ID

module.exports = router; // Export the router
