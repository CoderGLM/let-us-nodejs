import express from 'express'
import User from '../lib/user'

const router = express.Router()

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' }) 
})

router.post('/login', function (req, res, next) {
  /*
   *
   *  为什么不能这么用？为什么？为什么？在`13.express`里就可以
   *
   */
  /* const data = req.body.user */
  const data = {
    name: req.body["user[name]"],
    pass: req.body["user[pass]"]
  }

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
