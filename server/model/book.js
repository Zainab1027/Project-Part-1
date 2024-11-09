const mongoose = require("mongoose");

// Defining the Book schema with validation and custom options
const bookSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: [true, 'Book name is required'],
            trim: true,
            minlength: [3, 'Book name must be at least 3 characters']
        },
        Author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true
        },
        Published: {
            type: Date, // Using Date to store publication date
            required: [true, 'Published date is required']
        },
        Description: {
            type: String,
            maxlength: [500, 'Description should not exceed 500 characters'],
            default: 'No description provided'
        },
        Price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be a positive number']
        },
        ISBN: {
            type: String,
            unique: true, // Each book should have a unique ISBN
            required: [true, 'ISBN is required']
        }
    },
    {
        collection: "Bio_books", // Setting the MongoDB collection name
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Exporting the Book model for use in other parts of the app
module.exports = mongoose.model('Book', bookSchema);
