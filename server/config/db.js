require('dotenv').config(); // Load .env variables
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI; // Use DB_URI from .env

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));
console.log("mongodb+srv://zainab1027:Laser123@cluster0.pjrsq.mongodb.net/Project1?retryWrites=true&w=majority", dbURI); // Add this line to check if DB_URI is being read correctly
