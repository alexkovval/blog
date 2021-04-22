const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const app = express()

const account = require('./routes/account')
const posts = require('./routes/posts')

mongoose.connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

mongoose.connection.on('connected', () => {
    console.log("Successful connection to the database")
});

mongoose.connection.on('error', (err) => {
    console.log("Not successful connection to the database" + err)
});


app.use('/api/auth', account);
app.use('/api/post', posts);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))
  
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(
          __dirname, 'client', 'dist', 'client', 'index.html'
        )
      )
    })
  }
  

module.exports = app