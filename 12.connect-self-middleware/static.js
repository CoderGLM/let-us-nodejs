import connect from 'connect'
import serveStatic from 'serve-static'

const app = connect()
app
  .use(serveStatic('public'))
  .listen(3000);
