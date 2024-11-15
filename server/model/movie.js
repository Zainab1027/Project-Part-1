// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let MovieModel = mongoose.Schema({
  title: String,
  genre: String,
  year: String,
  description: String
},
  {
    collection: "Movies"
  }
)
module.exports = mongoose.model('MovieModel', MovieModel)