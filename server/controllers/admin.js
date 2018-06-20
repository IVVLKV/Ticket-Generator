var User = require('../models/User.js')
var auth = require('./authentication.js')
var express = require('express')
var router = express.Router()

router.get('/users', auth.isInRole('admin'), async (req, res) => {
  try {
    var users = await User.find({}, '-password -__v')
    res.send(users)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

router.get('/edit/:userId', auth.isInRole('admin'), (req, res, next) => {
  User.findById(req.params.userId, { 'password': 0, '__v': 0 }, (err, user) => {
    if (err) {
      res.status(500).send(err)
    } else if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('No user found')
    }
  })
})

router.patch('/edit/:userId', auth.isInRole('admin'), (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err)
    } else {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.role = req.body.role || user.role
      user.bckgColor = req.body.bckgColor || user.bckgColor
      user.textColor = req.body.textColor || user.textColor

      user.save((err, user) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send({
            name: user.name,
            email: user.email,
            role: user.role,
            bckgColor: user.bckgColor,
            textColor: user.textColor
          })
        }
      })
    }
  })
})

router.delete('/remove/:userId', auth.isInRole('admin'), (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err)
    }
    if (user) {
      user.remove()
      res.status(200).send({ message: 'User removed' })
    }
  })
})

module.exports = router
