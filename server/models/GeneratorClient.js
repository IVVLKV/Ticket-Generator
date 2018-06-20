let mongoose = require('mongoose')

let GeneratorClientSchema = new mongoose.Schema({
  name: String,
  abbr: String
})

module.exports = mongoose.model('Client', GeneratorClientSchema)
