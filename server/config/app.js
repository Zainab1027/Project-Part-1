let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let moviesRouter = require('../routes/movie');

let app = express();

// Database setup
let mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('MongoDB Connected');
});

// View engine setup
app.set('views', path.join(__dirname, '../views'));  // Fixed path for views
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));  // Only if you need assets from node_modules

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', moviesRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
