const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

mongoose.connect('mongodb+srv://bonzo:Matadoro1@cluster0-4mujf.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to DB')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


//Express routuing for connection with backend
app.post('/registerLogin', (req, res) => {
  const { signUpName, signUpSurname, signUpEmail, signUpPassword, signUpConfirmPassword } = req.body
  let errors = []

  if (!signUpName || !signUpSurname || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
    errors.push({ msg: 'Please fill all fileds' })
  }
  if (signUpPassword !== signUpConfirmPassword) {
    errors.push({ msg: 'Passwords do not match' })
  }
  if (signUpPassword.length < 6) {
    errors.push({ msg: 'Passwords should be at least 6 characters' })
  }

  console.log(errors)
  if (errors.length > 0) {
    res.send(errors)
  } else {
    User.findOne({ signUpEmail: signUpEmail })

      .then(user => {
        if (user) {
          errors.push({ msg: 'Email is already existing' })
          res.send(errors)
        } else {
          const newUser = new User({
            signUpName,
            signUpSurname,
            signUpEmail,
            signUpPassword
          })

          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.signUpPassword, salt, (err, hash) => {
            if (err) throw err;

            // set pass to hash
            newUser.signUpPassword = hash
            // save user
            newUser.save()
              .then(res.send('registered success'))
              .catch(err => console.log(err))

          }))
        }
      })
  }
})







app.listen(4000, () => {
  console.log('Listening on port 4000')
})