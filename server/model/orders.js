const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
  isPaid: Boolean,
  isDelivered: Boolean,
  userId: String,
  booksId: String
})

module.exports = mongoose.model('Orders', ordersSchema)