const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const DB = require('./db');

// Connect to MongoDB
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
app.use('/', require('../routes/index'));
app.use('/books', require('../routes/book'));

// 404 error handler
app.use((req, res) => {
  res.status(404).render('error', { title: 'Error', message: 'Page Not Found' });
});

module.exports = app;

