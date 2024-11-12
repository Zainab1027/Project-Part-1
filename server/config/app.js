const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import routes
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const bookRouter = require('../routes/book');
app.use('/', indexRouter);
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// MongoDB connection setup
require('dotenv').config();
const DB_URI = process.env.DB_URI;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter); // Route for book CRUD operations

// Error handling
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
