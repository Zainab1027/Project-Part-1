const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// MongoDB Connection
const DB = require('./db').URI; // Load URI from db.js
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// View Engine Setup
app.set('views', path.join(__dirname, '../../views')); // Adjust for correct path
app.set('view engine', 'ejs');

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

// Routes Setup
app.use('/', require('../routes/index')); // Landing Page route
app.use('/books', require('../routes/book')); // Books route
app.use('/users', require('../routes/users')); // Users route, if needed

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('error', { title: 'Error', message: 'Page Not Found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', { title: 'Error', message: err.message });
});

module.exports = app;
