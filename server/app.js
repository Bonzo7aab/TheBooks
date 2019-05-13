const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// allo cross-origin requests CORS
app.use(cors())

mongoose.connect('mongodb+srv://bonzo:Matadoro1@cluster0-4mujf.mongodb.net/test?retryWrites=true')
mongoose.connection.once('open', () => {
  console.log('connected to DB')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


//Express routuing for connection with backend
// app.get('/news', (req, res) => {
//   res.send
// })







app.listen(4000, () => {
  console.log('Listening on port 4000')
})