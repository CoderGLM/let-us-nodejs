import redis from 'redis'

const db = redis.createClient()

function Entry(obj) {
  Object.assign(this, obj)
}

Entry.prototype.save = function (fn) {
  const entryJSON = JSON.stringify(this)

  db.lpush('entries', entryJSON, err => {
    if (err) return next(err)
    fn()
  })
}

Entry.getRange = function (from, to, fn) {
  db.lrange('entries', from, to, (err, items) => {
    if (err) return fn(err)
    let entries = []
    items.forEach(item => {
      entries.push(JSON.parse(item))
    })
    fn(null, entries)
  })
}

Entry.count = function (fn) {
  db.llen('entries', fn)
}

module.exports = Entry 
