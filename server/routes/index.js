var express = require('express');
var router = express.Router();

/* GET / page. */
router.get('/', function (req, res, next) {
  res.render('Movies/list', { title: 'Movies' });
});
/* GET movies list. */
router.get('/movies', function (req, res, next) {
  res.render('Movies/list', { title: 'Movies' });
});
/* add movies page. */
router.get('/movies/add', function (req, res, next) {
  res.render('Movies/add', { title: 'Add movie' });
});
/* edit movies page. */
router.get('/movies/edit', function (req, res, next) {
  res.render('Movies/edit', { title: 'Edit movie' });
});

module.exports = router;
