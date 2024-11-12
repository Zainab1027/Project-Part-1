require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Use the port from .env
const port = process.env.PORT || 3000;

// Set view engine
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this to handle form submissions

// Serve static files (CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRouter = require('./server/routes/index'); // Main page router
const bookRouter = require('./server/routes/book');   // Books router

// Use routes
app.use('/', indexRouter);       // Set root route to use indexRouter
app.use('/books', bookRouter);   // Set '/books' route to use bookRouter

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
