var GeneratorTicket = require('../models/GeneratorTickеt')
var express = require('express')
var auth = require('./authentication.js')
var shortid = require('shortid')
var moment = require('moment')
var router = express.Router()

router.post('/', auth.isInRole('admin, pm'), (req, res) => {
  var ticketData = req.body
  var ticketDetails = new GeneratorTicket(ticketData)
  var id = shortid.generate()
  ticketDetails.number = ticketDetails.clientAbbr + '-' + id
  ticketDetails.date = moment()

  GeneratorTicket.findOne({'number': ticketDetails.number}, function (err, ticket) {
    if (err) return res.status(500).send({ message: 'Internal Server Error' })
    if (ticket) {
      return res.status(500).send({ message: 'Please try again' })
    } else if (ticketDetails.name && ticketDetails.number) {
      if (err) return res.status(500).send({ message: 'Error saving ticket' })
      ticketDetails.save()
      res.status(201).send(ticketDetails)
    } else {
      return res.status(500).send({ message: 'Ticket number and name are required' })
    }
  })
})

router.get('/', (req, res) => {
  let query = {}
  if (req.query.clientAbbr) {
    query.clientAbbr = req.query.clientAbbr
  }
  GeneratorTicket.find(query, { '__v': 0 }, (err, tickets) => {
    if (err) {
      res.status(500).send(err)
    } else {
      let returnTickets = []
      tickets.forEach((element, index, array) => {
        let newTicket = element.toJSON()
        returnTickets.push(newTicket)
      })
      res.json(returnTickets)
    }
  })
})

router.get('/:ticketId', (req, res, next) => {
  GeneratorTicket.findById(req.params.ticketId, { '__v': 0 }, (err, ticket) => {
    if (err) {
      res.status(500).send(err)
    } else if (ticket) {
      res.status(200).send(ticket)
    } else {
      res.status(404).send('No ticket found')
    }
  })
})

router.delete('/:ticketId', auth.isInRole('admin, pm'), (req, res, next) => {
  GeneratorTicket.findById(req.params.ticketId, (err, ticket) => {
    if (err) {
      res.status(500).send(err)
    }
    if (ticket) {
      ticket.remove()
      res.status(200).send({ ticket: {msg: 'Ticket deleted.'} })
    }
  })
})

module.exports = router
