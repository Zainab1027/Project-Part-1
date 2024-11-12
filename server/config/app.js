require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// MongoDB Connection
const DB = process.env.MONGODB_URI || require('./server/config/db').URI; // Use environment variable or fallback
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Setup
app.use('/', require('./server/routes/index'));
app.use('/books', require('./server/routes/book'));
app.use('/users', require('./server/routes/users'));

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('error', { title: 'Error', message: 'Page Not Found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;