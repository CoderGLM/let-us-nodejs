
function getField (req, field) {
  return req.body[field]
}

exports.required = function (field) {
  return function (req, res, next) {
    if (getField(req, field)) {
      next()
    } else {
      res.error(field.join(' ') + ' is required')
      res.redirect('back')
    }
  }
}

exports.lengthAbove = function (field, len) {
  return function (req, res, next) {
    if (getField(req, field).length > len) {
      next()
    } else {
      res.error(field + ' must more than ' + len)
      res.redirect('back')
    }
  }
}
