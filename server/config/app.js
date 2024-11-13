const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();  // Make sure environment variables are loaded before usage

const app = express();  // Initialize app after all dependencies

// MongoDB connection setup
const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Set up view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

// Import routes after setting up the app
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const bookRouter = require('../routes/book');

// Use routes
app.use('/', indexRouter);      // Main page route
app.use('/users', usersRouter); // Users route
app.use('/books', bookRouter);  // Books route for CRUD operations

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', { title: 'Error', error });
});

module.exports = app;
