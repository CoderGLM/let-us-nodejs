//
// koa: http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471087582981d6c0ea265bf241b59a04fa6f61d767f6000
//

//
//  terminal 启动mysql（> mysql -uroot）报错
//
//  ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
//  > mysqld stop
//  > mysql.server start
//

const fs = require ('fs')
const path = require('path')
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const controller = require('./lib/middleware/controller')
const templating = require('./lib/middleware/nunjucks')
const Sequelize = require('sequelize')
const config = require('./config')
const isProduction = process.env.NODE_ENV == 'production'

var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

var Pet = sequelize.define('pet', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
  version: Sequelize.BIGINT
}, {
  timestamps: false
})

var now = new Date()

//Pet.create({
//  id: `g-${now.getTime()}`,
//  name: 'Gaffey',
//  gender: false,
//  birth: '2007-07-07',
//  createdAt: now.getTime(),
//  updatedAt: now.getTime(),
//  version: 0
//}).then(function (p) {
//  console.log(`created. ${JSON.stringify(p)}`)
//}).catch(err => {
//  console.log(`failed: ${err}`)
//})

/* (async () => {
  await Pet.create({
    id: `g-${now.getTime()}`,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now.getTime(),
    updatedAt: now.getTime(),
    version: 0
  })
})() */

Pet.findAll({
  where: {
    name: 'Gaffey'
  }
}).then(p => {
  console.log(p)
})

/*(async () => {
    var pets = await Pet.findAll({
    where: {
      name: 'Gaffey'
    }
  });
  console.log(`find ${pets.length} pets:`)
  for (let p of pets) {
    console.log(JSON.stringify(p))
  }})()*/


app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  var
     start = new Date().getTime(),
     execTime
  await next()
  execTime = new Date().getTime() - start
  ctx.response.set('X-Response-Time', `${execTime}ms`)
})
if (!isProduction) {
  let staticFiles = require('./lib/middleware/static-files')
  app.use(staticFiles(`/static/`, `${__dirname}/static`))
}
app.use(bodyParser())
app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}))
app.use(controller())

app.listen(3000)
console.log("app started at port 3000...")
