//
// koa: http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471087582981d6c0ea265bf241b59a04fa6f61d767f6000
// sequelize: http://node-webdevelopment.blogspot.com/2012/12/async-queries-with-sequilizejs.html
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
const model = require('./models')
const isProduction = process.env.NODE_ENV == 'production'

/*var now = new Date()
model.pet.create({
  id: `g-${now.getTime()}`,
  name: 'Gaffey',
  gender: false,
  birth: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDay()}`,
  createdAt: now.getTime(),
  updatedAt: now.getTime(),
  version: 0
}).then(function (p) {
  console.log(`created. ${JSON.stringify(p)}`)
}).catch(err => {
  console.log(`failed: ${err}`)
})*/

model.user.create({
  email: '77979****@qq.com',
  passwd: '1234',
  name: 'glm',
  gender: false
}).then(() => {
  model.sync()
})

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
