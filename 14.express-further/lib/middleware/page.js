module.exports = function (fn, perpage) {
  perpage = perpage || 10
  return function (req, res, next) {
    if (!/^[0-9]+$/.test(req.param('page'))) {
      req.page = null
      next()
      return
    }

    let page = Math.max(parseInt(req.param('page') || '1', 10), 1) - 1
    page = Number.isNaN(page) ? 0 : page
    fn(function (err, total) {
      if (err) return next(err)
      req.page = res.locals.page = {
        number: page,
        perpage,
        from: page*perpage,
        to:page*perpage+perpage-1,
        total,
        count: Math.ceil(total/perpage)
      }
      next()
    })
  }
}
