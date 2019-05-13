const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  signUpName: {
    type: String,
    required: true
  },
  signUpSurname: {
    type: String,
    required: true
  },
  signUpEmail: {
    type: String,
    required: true
  },
  signUpPassword: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)