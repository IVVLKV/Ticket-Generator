let mongoose = require('mongoose')

let TicketSchema = new mongoose.Schema({
  pm: String,
  link: String,
  number: String,
  status: String,
  requestor: String,
  dev: String,
  qa: String,
  priority: String,
  designer: String,
  deadline: String,
  category: String,
  notes: String,
  files: String,
  active: { type: Boolean, default: true }
})

module.exports = mongoose.model('Ticket', TicketSchema)
