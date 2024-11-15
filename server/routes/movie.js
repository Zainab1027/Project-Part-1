var express = require('express');
var router = express.Router();
let MovieModel = require('../model/movie')
router.get('/', async (req, res, next) => {
    try {
        const MovieList = await MovieModel.find();
        res.render('Movies/list', {
            title: 'Movies',
            MovieList: MovieList
        })
    }
    catch (err) {
        console.error(err)
        res.render('Movies/list', {
            error: 'Error on Server'
        })
    }
})
module.exports = router;