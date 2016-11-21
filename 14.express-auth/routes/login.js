import express from 'express'
import User from '../lib/user'

const router = express.Router()

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' }) 
})

router.post('/login', function (req, res, next) {
  const data = req.body.user
  User.authenticate(data.name, data.pass, function (err, user) {
    if (err) return next(err)
    if (user) {
      req.session.uid = user.id
      res.redirect('/')
    } else {
      res.error('Sorry! invalid credentials')
      res.redirect('back')
    }
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/')
  })
})

module.exports = router
