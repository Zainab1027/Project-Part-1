var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', description: "Welcome!!",
    displayName: req.user ? req.user.displayName : ''});
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Welcome to our Movie Library!!',
    description: 'This is a simple Movie Library. You can add, edit, delete, and view your movies.',
    displayName: req.user ? req.user.displayName : ''}); //add displayName
});
/* GET About page. */
router.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'About us',
    description: "Hi, welcome! We are team R&Z!, We are the developer of this movie library application. We are passionate about making a Library where we can share our favourite movies. We wanted to create a site where all of us can share our top best movies with others.",
    displayName: req.user ? req.user.displayName : ''}); //add displayName
});
/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Products',
    description: "Here are some of the products we have created. You can also add your movies to this list in the movies section.",
    displayName: req.user ? req.user.displayName : ''}); //add displayName
});
/* GET service page. */
router.get('/service', function(req, res, next) {
  res.render('service', { title: 'Service',
    description: 'Our service includes creating, editing, deleting, and viewing movies.',
    displayName: req.user ? req.user.displayName : ''}); //add displayName
});

/* GET contactus page. */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us',
    description: 'if you have any questions or need help with creating movies in our library, please don\'t hesitate to contact us at zainab.syed1@ontariotechu.net or rida.fatima1@ontariotechu.net.',
    displayName: req.user ? req.user.displayName : ''}); //add displayName
});

// Get router for login page
router.get('/login', indexController.displayLoginPage);

//post router for login page
router.post('/login', indexController.processLoginPage);

// Get router for registration page
router.get('/register', indexController.displayRegisterPage);

//post router for registration page
router.post('/register', indexController.processRegisterPage);

//get router for logout page
router.get('/logout', indexController.performLogout);

module.exports = router;
