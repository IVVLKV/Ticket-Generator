var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var config = require('./config.js')

var authentication = require('./controllers/authentication.js')
var admin = require('./controllers/admin.js')
var tickets = require('./controllers/tickets.js')
var generatorClient = require('./controllers/generator-client.js')
var generatorTicket = require('./controllers/generator-ticket.js')

var app = express()

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
  var allowedOrigins = ['http://192.168.0.183', 'http://pmtool'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false)

  // Pass to next layer of middleware
  next()
})

// (node:7472) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise

app.use(bodyParser.json())

app.use('/authentication', authentication.router)
app.use('/admin', admin)
app.use('/tickets', tickets)
app.use('/generator/client', generatorClient)
app.use('/generator/ticket', generatorTicket)

mongoose.connect(config.dbURL, { useMongoClient: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to the database.')
})

let port = process.env.PORT || 3000
var server = app.listen(port, () => {
  console.log('Server running at http://localhost:' + port)
})

let io = require('socket.io')(server)

io.sockets.on('connection', function (socket) {
  console.log('user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('generatorAddClient', (clientData) => {
    io.emit('generatorAddClient', {client: clientData})
  })
  socket.on('generatorAddTicket', (ticketData) => {
    io.emit('generatorAddTicket', {ticket: ticketData})
  })
  socket.on('generatorDelTicket', (ticketData) => {
    io.emit('generatorAddTicket', {ticket: ticketData})
  })
})
