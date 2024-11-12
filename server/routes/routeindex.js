const express = require('express');
const app = express();
const port = 3000;

// Set up the view engine
app.set('view engine', 'ejs');

// Define routes for different pages
app.get('/', (req, res) => res.render('index', { title: 'Home' }));
app.get('/home', (req, res) => res.render('index', { title: 'Home' }));
app.get('/aboutus', (req, res) => res.render('index', { title: 'About Us' }));
app.get('/product', (req, res) => res.render('index', { title: 'Product' }));
app.get('/service', (req, res) => res.render('index', { title: 'Service' }));
app.get('/contactus', (req, res) => res.render('index', { title: 'Contact us' }));

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
