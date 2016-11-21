import express from 'express'
// https://github.com/jshttp/basic-auth
import basicAuth from 'basic-auth'
import User from '../lib/user'

const router = express.Router()

/*
 *
 *  授权，此为示例，其他接口未添加此功能
 *
 */
router.get('/', function (req, res, next) {
  let credentials = basicAuth(req)
  if (credentials) {
    User.authenticate(credentials.name, credentials.pass, function (err) {
      if (err) throw err
      res.end('Access granted')
    })
  } else {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  }
})

router.get('/user/:id', function (req, res, next) {
  User.get(req.params.id, function (err, user) {
    if (err) return next(err)
    if (!user.id) return res.send(404)
    res.json(user)
  })
})

module.exports = router


