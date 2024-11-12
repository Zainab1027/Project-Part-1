const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const app = express();
connectDB();

// Set up view engine
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
app.use('/', require('../routes/index'));
app.use('/books', require('../routes/book'));
app.use('/users', require('../routes/users'));

// 404 error handler
app.use((req, res) => {
  res.status(404).render('error', { title: 'Error', message: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { title: 'Error', message: err.message });
});

module.exports = app;
