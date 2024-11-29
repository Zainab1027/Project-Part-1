//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let movieModel = mongoose.Schema({
    Title: String,
    Genre: String,
    Rating: String,
    Description: String,
},
{
    collection:"Movies"
});
module.exports =mongoose.model('Movie',movieModel);
