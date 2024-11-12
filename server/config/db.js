require('dotenv').config(); // Load .env variables
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI; // Use DB_URI from .env

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));
  