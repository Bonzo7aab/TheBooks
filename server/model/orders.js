const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
  // user: Schema.Types.ObjectId,
  // books: String,
  isPaid: Boolean,
  isDelivered: Boolean,
  userId: String,
  booksId: [String]
  // for more books books: Array
})

module.exports = mongoose.model('Orders', ordersSchema)