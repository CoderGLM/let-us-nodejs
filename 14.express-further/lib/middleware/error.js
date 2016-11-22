/*
 *
 *  错误处理
 *
 */

module.exports = function (err, req, res, next) {
  console.error(err.stack)

  let msg;
  switch (err.type) {
    case 'database': {
        msg = "Server Unavailable"
        res.statusCode = 503
      }
      break
    default: {
      msg = "Internal Server Error"
      res.statusCode = 500
    }
  }

  res.format({
    html: () => {
      res.render('5xx', { msg: msg, status: res.statusCode })
    },
    json: () => {
      res.send({ error: msg })
    },
    text: () => {
      res.send(`${msg}\n`)
    }
  })
}

