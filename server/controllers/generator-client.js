var Client = require('../models/GeneratorClient.js')
var express = require('express')
var auth = require('./authentication.js')
var router = express.Router()

router.post('/', auth.isInRole('admin, pm'), (req, res) => {
  var clientData = req.body
  var clientDetails = new Client(clientData)
  Client.findOne({'name': clientDetails.name}, function (err, client) {
    if (err) return res.status(500).send({ message: 'Internal Server Error' })
    if (client) {
      return res.status(500).send({ message: 'Exisitng client' })
    } else if (clientDetails.name && clientDetails.abbr) {
      if (err) return res.status(500).send({ message: 'Error saving client' })
      clientDetails.save()
      res.status(201).send(clientDetails)
    } else {
      return res.status(500).send({ message: 'Client name and abbreviation are required' })
    }
  })
})

router.get('/', (req, res) => {
  Client.find({ '__v': 0 }, (err, clients) => {
    if (err) {
      res.status(500).send(err)
    } else {
      let returnClients = []
      clients.forEach((element, index, array) => {
        let newClient = element.toJSON()
        returnClients.push(newClient)
      })
      res.json(returnClients)
    }
  })
})

router.get('/:clientId', (req, res, next) => {
  Client.findById(req.params.clientId, { '__v': 0 }, (err, client) => {
    if (err) {
      res.status(500).send(err)
    } else if (client) {
      res.status(200).send(client)
    } else {
      res.status(404).send('No client found')
    }
  })
})

router.delete('/:clientId', auth.isInRole('admin, pm'), (req, res, next) => {
  Client.findById(req.params.clientId, (err, client) => {
    if (err) {
      res.status(500).send(err)
    }
    if (client) {
      client.remove()
      res.status(200).send({ message: 'Client deleted.' })
    }
  })
})

module.exports = router
