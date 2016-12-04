//
// http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471087582981d6c0ea265bf241b59a04fa6f61d767f6000
//

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = "text/html"
  ctx.response.body = "<h1>Hello</h1>"
})

app.listen(3000)
console.log("app started at port 3000...")
