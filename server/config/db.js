require('dotenv').config();
require('dotenv').config();

module.exports = {
    URI: process.env.MONGODB_URI
};
// Load environment variables from .env file
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI; // Load the URI from .env

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("MongoDB connection error:", error));