import express from 'express'
import Entry from '../lib/entry'
import validate from '../lib/middleware/validate'
import page from '../lib/middleware/page'

const router = express.Router()

/*
 * ？表示参数是可选的
 */
router.get('/:page?', page(Entry.count, 5), function (req, res, next) {
  let page = req.page
  if (!page) {
    next()
    return
  }
  Entry.getRange(page.from, page.to, function (err, entries) {
    if (err) return next(err)
    res.render('entries', {
      title: 'Entries',
      entries
    })
  })
})

router.get('/post', function (req, res) {
  res.render('post', { title: 'Post' })
})

router.post('/post', validate.required('entry[title]'),
            validate.lengthAbove('entry[title]', 4),
            function (req, res, next) {
  /*
   * 不知道为何不能entry.title这么访问
   */
  const data = {
    title: req.body["entry[title]"],
    body: req.body["entry[body]"]
  }
  const entry = new Entry({
    'username': res.locals.user.name,
    'title': data.title,
    'body': data.body
  })
  entry.save(err => {
    if (err) return next(err)
    res.redirect('/')
  })
})

module.exports = router
