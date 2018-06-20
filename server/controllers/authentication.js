var User = require('../models/User.js')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')
// TOKEN EXPIRATION FUNCTIONALITY
// var moment = require('moment')
var express = require('express')
var router = express.Router()
var config = require('../config')

router.post('/register', (req, res) => {
  var userData = req.body
  var userDetails = new User(userData)
  if (!req.body.role) {
    User.findOne({'email': userDetails.email}, function (err, user) {
      if (err) return res.status(500).send({ message: 'Internal Server Error' })

      if (user) {
        return res.status(500).send({ message: 'The email is already in use' })
      } else if (userDetails.email && userDetails.password) {
        userDetails.save((err, newUser) => {
          if (err) return res.status(500).send({ message: 'Error saving user' })

          createSendToken(res, newUser)
        })
      } else {
        return res.status(500).send({ message: 'Email and Password are required' })
      }
    })
  } else {
    return res.status(500).send({ message: 'Invalid data.' })
  }
})

router.post('/login', async (req, res) => {
  var loginData = req.body
  var user = await User.findOne({ email: loginData.email })

  if (!user) {
    return res.status(401).send({ message: 'Email or Password invalid' })
  }

  bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
    if (err) return res.status(500).send({ message: 'Internal Server Error' })

    if (!isMatch) {
      return res.status(401).send({ message: 'Email or Password invalid' })
    } else {
      createSendToken(res, user)
    }
  })
})

function createSendToken (res, user) {
  // TOKEN EXPIRATION FUNCTIONALITY
  // const expires = moment().add(config.expire, 'seconds').valueOf()
  // var payload = { sub: user._id, exp: expires }
  var payload = { sub: user._id }
  var token = jwt.encode(payload, config.secret)
  res.status(200).send({ token: token, name: user.name, id: user._id })
}

var authentication = {
  router,
  checkAuthenticated: () => {
    return (req, res, next) => {
      if (!req.header('authorization')) {
        return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' })
      }

      var token = req.header('Authorization').split(' ')[1]
      var payload = jwt.decode(token, config.secret)

      if (!payload.sub) {
        return res.status(401).send({ message: 'Unauthorized.' })
      }

      req.userId = payload.sub

      // TOKEN EXPIRATION FUNCTIONALITY
      // var tokenExpire = payload.exp
      // if (tokenExpire <= new Date()) {
      //   return res.status(401).send({ message: 'Session expired.' })
      // } else {
      //   next()
      // }

      next()
    }
  },
  isInRole: (role) => {
    return (req, res, next) => {
      var token = req.header('Authorization').split(' ')[1]
      var payload = jwt.decode(token, config.secret)

      if (!payload) {
        return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid' })
      } else {
        User.findOne({'_id': payload.sub}, function (err, user) {
          if (err) {
            return res.status(503).send({ message: 'Internal Server Error!' })
          }

          var roles = role.split(',')
          var access = false
          roles.forEach(function (rl) {
            if (user.role === rl.trim()) {
              access = true
            }
          })

          if (access) {
            next()
          } else {
            return res.status(401).send({ message: 'Unauthorized.' })
          }
        })
      }
    }
  }
}

router.get('/role', authentication.checkAuthenticated(), (req, res) => {
  var token = req.header('Authorization').split(' ')[1]
  var payload = jwt.decode(token, config.secret)

  if (!payload) {
    return res.status(401).send({ message: 'Unauthorized.' })
  } else {
    User.findById(payload.sub, { 'password': 0, '__v': 0 }, (err, user) => {
      if (err) {
        res.status(500).send(err)
      } else if (user) {
        res.status(200).send({ role: user.role })
      } else {
        res.status(404).send('No user found')
      }
    })
  }
})

module.exports = authentication
