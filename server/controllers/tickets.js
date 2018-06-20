var Ticket = require('../models/Ticket.js')
var express = require('express')
var auth = require('./authentication.js')
var router = express.Router()

router.post('/', auth.isInRole('admin, pm'), (req, res) => {
  if (!req.body.number) {
    res.status(400).send('Ticket number is required')
  } else {
    let ticket = new Ticket(req.body)
    ticket.save()
    res.status(201).send(ticket)
  }
})

router.get('/', auth.checkAuthenticated(), (req, res) => {
  let query = {}
  if (req.query.active) {
    query.active = req.query.active
  }
  Ticket.find(query, { '__v': 0 }, (err, tickets) => {
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

router.get('/:ticketId', auth.checkAuthenticated(), (req, res, next) => {
  Ticket.findById(req.params.ticketId, { '__v': 0 }, (err, ticket) => {
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
  Ticket.findById(req.params.ticketId, (err, ticket) => {
    if (err) {
      res.status(500).send(err)
    }
    if (ticket) {
      ticket.remove()
      res.status(200).send({ message: 'Ticket deleted.' })
    }
  })
})

router.patch('/:ticketId', auth.isInRole('admin, pm'), (req, res, next) => {
  Ticket.findById(req.params.ticketId, (err, ticket) => {
    if (err) {
      res.status(500).send(err)
    } else {
      if (!ticket.number) {
        res.status(400).send('Ticket number is required')
      } else {
        for (let key in ticket) {
          ticket[key] = req.body[key] || ticket[key]
        }
        console.log(ticket.active)
        ticket.save((err) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.json(ticket)
          }
        })
      }
    }
  })
})

module.exports = router
