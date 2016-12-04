var register = require('babel-core/register')

register({
  presets: ['es2015','stage-3']
})

require('./app.js')
