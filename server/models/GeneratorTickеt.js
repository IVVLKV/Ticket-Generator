let mongoose = require('mongoose')

let GeneatorTicketSchema = new mongoose.Schema({
  number: String,
  name: String,
  clientAbbr: String,
  date: String
})

module.exports = mongoose.model('GeneratorTicket', GeneatorTicketSchema)
