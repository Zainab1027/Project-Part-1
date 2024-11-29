var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Movie = require('../model/movie.js');
const movie = require('../model/movie.js');
let movieController = require('../controllers/movie.js')


/* Get route for the movie list - Read Operation */

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/', async (req, res, next) => {
    try {
        const MovieList = await Movie.find();
        res.render('Movie/list', {
            title: 'Movie',
            MovieList: MovieList,
            displayName: req.user ? req.user.displayName : ''
        });
    }
    catch (err) {
        console.error(err);
        res.render('Movie/list', {
            error: 'Error on the server'
        })
    }
});
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add', requireAuth, async (req, res, next) => {
    try {
        res.render('Movie/add', {
            title: 'Add Movie'
        })
    }
    catch (err) {
        console.error(err);
        res.render('Movie/list', {
            error: 'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add', requireAuth, async (req, res, next) => {
    try {
        let newMovie = Movie({
            "Title": req.body.Title,
            "Genre": req.body.Genre,
            "Rating": req.body.Rating,
            "Description": req.body.Description
        });
        Movie.create(newMovie).then(() => {
            res.redirect('/movieslist');
        })
    }
    catch (err) {
        console.error(err);
        res.render('Movie/list', {
            error: 'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id', requireAuth, async (req, res, next) => {
    try {
        const id = req.params.id;
        const movieToEdit = await Movie.findById(id);
        res.render('Movie/edit',
            {
                title: 'Edit Movie',
                Movie: movieToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
    }
    catch (err) {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */
router.post('/edit/:id', requireAuth, async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedMovie = Movie({
            "_id": id,
            "Title": req.body.Title,
            "Genre": req.body.Genre,
            "Rating": req.body.Rating,
            "Description": req.body.Description
        });
        Movie.findByIdAndUpdate(id, updatedMovie).then(() => {
            res.redirect('/movieslist')
        })
    }
    catch (err) {
        console.error(err);
        res.render('Movie/list', {
            error: 'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', requireAuth, async (req, res, next) => {
    try {
        let id = req.params.id;
        Movie.deleteOne({ _id: id }).then(() => {
            res.redirect('/movieslist')
        })
    }
    catch (error) {
        console.error(err);
        res.render('Movie/list', {
            error: 'Error on the server'
        })
    }
});

module.exports = router;