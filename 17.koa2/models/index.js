import fs from 'fs'
import db from '../db'

module.exports = {}

fs.readdirSync(__dirname)
  .filter(f => {
    return f !== 'index.js' && f.endsWith('.js')
  })
  .forEach(f => {
    console.log(`import model from file ${f}...`)
    let name = f.substring(0, f.length - 3)
    module.exports[name] = require(`./${f}`)
  })

module.exports.sync = () => {
  db.sync()
}
