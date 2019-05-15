const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userSurname: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)