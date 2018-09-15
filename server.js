const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')


//Connect to MongoDB Database 
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected '+config.database)
})

mongoose.connection.on('error', (err) => {
  console.log('Database Error: ', +err)
})

const app = express();

const users = require('./routes/users')

//Port Number
const port = process.env.PORT || 8080;

//CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

//Start Server
app.listen(port, () => {
  console.log('Server start on port ' + port)
})
