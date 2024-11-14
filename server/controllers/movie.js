const Movie = require('../model/movie'); // Using Movie schema from 'movie.js'

// Display all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('Movies/list', { title: 'Movies', MovieList: movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).render('Movies/list', { title: 'Movies', error: 'Failed to load movies' });
    }
};

// Show form to add a new movie
exports.showAddMovieForm = (req, res) => {
    res.render('Movies/add', { title: 'Add Movie' });
};

// Add a new movie
exports.addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.redirect('/movies'); // Redirect to movie list
    } catch (error) {
        console.error("Error adding movie:", error);
        res.status(500).render('Movies/add', { title: 'Add Movie', error: 'Failed to add movie' });
    }
};

// Show form to edit a movie
exports.showEditMovieForm = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render('Movies/edit', { title: 'Edit Movie', Movie: movie });
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).render('Movies/edit', { title: 'Edit Movie', error: 'Failed to load movie' });
    }
};

// Update a movie
exports.updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/movies');
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).render('Movies/edit', { title: 'Edit Movie', error: 'Failed to update movie' });
    }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndRemove(req.params.id);
        res.redirect('/Movies');
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).render('Movies/list', { title: 'Movies', error: 'Failed to delete movie' });
    }
};
