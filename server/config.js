let secret = process.env.JWT_SECRET || '4EQPgSMGZVafr5Se2HqvCZgJGZVafr5Se2'
let dbURL = 'mongodb://localhost:27017/Generator'
// TOKEN EXPIRATION FUNCTIONALITY
// let expire = 10

module.exports = {
  'secret': secret,
  'dbURL': dbURL
  // TOKEN EXPIRATION FUNCTIONALITY
  // 'expire': expire
}
