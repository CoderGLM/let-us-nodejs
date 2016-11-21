import express from 'express'
import User from '../lib/user'

const router = express.Router()

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' })
})

router.post('/register', function (req, res, next) {
  /*const data = req.body.user*/
  const data = { name: req.body["user[name]"], pass: req.body["user[pass]"] }
  User.getByName(data.name, function (err, user) {
    if (err) return next(err)
    if (user.id) {
      res.error('Username already taken!')
      res.redirect('back')
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      })
      user.save(err => {
        if (err) return next(err)
        req.session.uid = user.id
        res.redirect('/')
      })
    }
  })
})

module.exports = router
