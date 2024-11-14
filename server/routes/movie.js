var express = require('express');
var router = express.Router();
const MovieModel = require('../model/movie');
const MovieController = require('../controllers/movie.js');
/* Get route for the book list - Read Operation */
/*
GET, 
Post, 
Put --> Edit/Update
*/

/* Read operation --> Get route for displaying the books list*/


router.get('/',async(req,res,next)=>{
    try{
        const MovieList = await Movies.find();
        res.render('movies/list',{
            title:'Movies',
            Movies:MovieList
        })
    }
    catch(err){
        console.error(err)
        res.render('movies/list',{
            error:'Error on Server'})
    }
})
/* Create operation --> Get route for displaying the Add Page */
router.get('/add', async(req, res,next) => {
    try {
        res.render('movies/add',{
            title: 'Add movie'
        });
    }
    catch(err)
    {
        console.error(err)
        res.render('movies/list',{
            error:'Error on Server'})
    }
});
/* Create Operation --> Post route for Processing the Add Page */
router.post('/add', async(req, res,next) => {
    try {
        /* change this up for the assignment or project */
        let newMovies = Movies({
            "title": req.body.title,
            "genre": req.body.genre,
            "year": req.body.year,
            "description": req.body.description,
        });
        Movies.create(newMovies).then(()=> {
            res.redirect('/movieslist');
        })

    }
    catch(err)
    {
        console.error(err)
        res.render('movies/list',{
            error:'Error on Server'})
    }
});
/* Update operation --> Get route for displaying the Edit Page */
router.get('/edit/:id',async(req, res,next) => {
    try {

        const id = req.params.id;
        const moviesToEdit = await Movies.findById(id);
        res.render('movies/edit',
            {
                title: 'Edit Movie Information',
                Movies:moviesToEdit
            }
        )

    }
    catch(err)
    {
        console.error(err)
        next(err); //passing the error
    }
});
/* Update Operation --> Post route for Processing the Edit Page */
router.post('/edit/:id',async(req, res,next) => {
    try {
        let id=req.params.id;
        let updatedMovies = Movies({
            "_id":id, 
            "title":req.body.title,
            "genre":req.body.genre,
            "year":req.body.year,
            "description":req.body.description,
        })
        Movies.findByIdAndUpdate(id, updatedMovies).then(()=>{
            res.redirect('/movieslist')
        })
    }

    catch(err)
    {
        console.error(err)
        res.render('movies/list',{
            error:'Error on Server'})
    }
});
/* Delete Operation --> Get route to perform Delete operation */
router.get('/delete/:id',async(req, res, next) => {
    try{
        let id=req.params.id;
        Movies.deleteOne({_id:id}).then(()=>{
            res.redirect('/movieslist')
        })
    }
    catch(err){
        console.error(err)
        res.render('movies/list',{
            error:'Error on Server'})
    }
});
module.exports = router;