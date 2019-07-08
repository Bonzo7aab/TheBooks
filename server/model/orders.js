const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
  // user: Schema.Types.ObjectId,
  userId: String,
  books: String,
  isPaid: Boolean,
  isDelivered: Boolean
  // for more books books: Array
})

module.exports = mongoose.model('Orders', ordersSchema)