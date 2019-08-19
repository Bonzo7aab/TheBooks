const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const User = require('./model/user')
const Book = require('./model/book')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const _ = require('lodash')

const app = express()

// List of ADMINS
const ADMINS = ['sadur@gmail.com']

const mongodbURL = 'mongodb+srv://bonzo:Matadoro1@cluster0-4mujf.mongodb.net/test?retryWrites=true'

//Passport config
require('./config/passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: mongodbURL
  })
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(mongodbURL, { useNewUrlParser: true }, )
mongoose.connection.on('error', function(error) {
  console.error('Database connection error:', error);
});
mongoose.connection.once('open', () => {
  console.log('connected to DB')
})

//mongo mongodb+srv://cluster0-4mujf.mongodb.net/test?retryWrites=true -u bonzo -p Matadoro1
// 192.46.111.46



app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


//Express routuing for connection with backend
app.post('/register', (req, res) => {
  const { userName, userSurname, userEmail, userPassword, userConfirmPassword } = req.body
  let errors = []

  if (!userName || !userSurname || !userEmail || !userPassword || !userConfirmPassword) {
    errors.push({ msg: 'Please fill all fileds' })
  }
  if (userPassword !== userConfirmPassword) {
    errors.push({ msg: 'Passwords do not match' })
  }
  if (userPassword.length < 6) {
    errors.push({ msg: 'Passwords should be at least 6 characters' })
  }

  console.log(errors)
  if (errors.length > 0) {
    res.send(errors)
  } else {
    User.findOne({ userEmail: userEmail })

      .then(user => {
        if (user) {
          errors.push({ msg: 'Email is already taken' })
          res.send(errors)
        } else {
          const newUser = new User({
            userName,
            userSurname,
            userEmail,
            userPassword
          })

          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.userPassword, salt, (err, hash) => {
            if (err) throw err;

            // set pass to hash
            newUser.userPassword = hash
            // save user
            newUser.save()
              .then(
                res.send('Registered successfully')
              )
              .catch(err => console.log(err))

          }))
        }
      })
  }
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.send({ msg: 'No such user', loggedIn: false })

    req.logIn(user, (err) => {
      if (err) return next(err)

      return res.send({
        msg: 'You are logged in ' + user.userName,
        loggedIn: true,
        loggedInADMIN: ADMINS.includes(user.userEmail) ? true : false,
        userDetails: {
          userId: user._id,
          userDate: user.date,
          userName: user.userName,
          userSurname: user.userSurname,
          userEmail: user.userEmail
        }
      })
    })
  })(req, res, next)
})

app.post('/newBooks', (req, res) => {
  const data = req.body
  const object = []
  for (let i = 1; i < data.length -1; i++) {
    object.push(_.zipObject(data[0], data[i]))
    
  }
  mongoose.connection.db.collection('books').insertMany(object, () => {
    console.log('CSV added to MongoDB')
    return res.send(object)
  })
})


app.listen(4000, () => {
  console.log('Listening on port 4000')
})