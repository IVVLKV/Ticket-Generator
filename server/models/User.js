var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: { type: String, default: 'user' },
  bckgColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#000001' }
})

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)
