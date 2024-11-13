const Movie = require('../model/movie'); // Movie model

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch all movies from the database
        res.render('index', { movies: movies }); // Render the index view with movie data
    } catch (error) {
        res.status(500).send('Error fetching movies');
    }
};

// Show the form to add a new movie
exports.showAddMovieForm = (req, res) => {
    res.render('add'); // Render the add movie form
};

// Handle adding a new movie
exports.addMovie = async (req, res) => {
    const { title, genre, year } = req.body; // Get movie details from the form
    const newMovie = new Movie({ title, genre, year }); // Create a new movie object

    try {
        await newMovie.save();  // Save the new movie to the database
        res.redirect('/movies'); // Redirect to the movies list after adding
    } catch (error) {
        res.status(500).send('Error adding movie');
    }
};

// Show the form to edit a movie
exports.showEditMovieForm = async (req, res) => {
    const movie = await Movie.findById(req.params.id); // Find the movie by its ID
    res.render('edit', { movie: movie }); // Render the edit form with the movie data
};

// Handle updating the movie details
exports.updateMovie = async (req, res) => {
    const { title, genre, year } = req.body; // Get updated movie details
    try {
        await Movie.findByIdAndUpdate(req.params.id, { title, genre, year }); // Update movie in database
        res.redirect('/movies'); // Redirect to the movies list after update
    } catch (error) {
        res.status(500).send('Error updating movie');
    }
};

// Handle deleting a movie
exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id); // Delete movie from the database
        res.redirect('/movies'); // Redirect to movies list after deletion
    } catch (error) {
        res.status(500).send('Error deleting movie');
    }
};
