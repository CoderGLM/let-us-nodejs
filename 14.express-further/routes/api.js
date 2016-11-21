import express from 'express'
// https://davidbeath.com/posts/expressjs-40-basicauth.html
import basicAuth from 'basic-auth-connect'
import User from '../lib/user'

const router = express.Router()

router.get('/', function (req, res, next) {
  if (basicAuth(User.authenticate)) {
    return next()
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  }
}, function (req, res, next) {
  res.send(200, 'Authenticated')
})

router.get('/user/:id', function (req, res, next) {
  User.get(req.params.id, function (err, user) {
    if (err) return next(err)
    if (!user.id) return res.send(404)
    res.json(user)
  })
})

module.exports = router


