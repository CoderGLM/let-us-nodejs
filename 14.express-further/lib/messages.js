import express from 'express'

let res = express.response

res.message = function (msg, type) {
  type = type || 'info'
  let sess = this.req.session
  sess.messages = sess.messages || []
  sess.messages.push({type, string: msg})
}

res.error = function (msg) {
  return this.message(msg, 'error')
}

module.exports = function (req, res, next) {
  res.locals.messages = req.session.messages || []
  res.locals.removeMessages = function () {
    req.session.messages = []
  }
  next()
}
