const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  genre: String,
  category: String, //Array?
  authorId: String,
  imageURL: String,
  price: Number,
  nrInStock: Number,
  SKUnumber: Number,
  ISBN: Number,
  publisher: String,
  publishDate: Number,  //Date
  addedDate: Number,    //Date
  description: String,
  condition: String,
  nrPages: Number,
  shelveInShop: Number
})

module.exports = mongoose.model('Book', bookSchema)