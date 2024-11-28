require('./config/app'); // Load environment variables
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

// Import routes
let indexRouter = require('./server/routes/index');
let usersRouter = require('./server/routes/users');
let bookRouter = require('./server/routes/book');

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mongoose setup and connection
const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI || require('./server/config/db').URI; // Use environment variable or fallback to config

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);

// 404 error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;