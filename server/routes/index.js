var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET movies page. */
router.get('/movies', function (req, res, next) {
  res.render('movies', { title: 'Movies List' }); // Ensure this view exists in your 'views' folder
});

/* GET add movie page. */
router.get('/movies/add', function (req, res, next) {
  res.render('add', { title: 'Add New Movie' }); // Ensure this view exists in your 'views' folder
});

module.exports = router;
