require('dotenv').config(); // Make sure to load .env variables

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB", error));

module.exports = mongoose; // Export mongoose if you need to use it elsewhere
