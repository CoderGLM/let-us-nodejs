/*
 *  https://github.com/expressjs/body-parser
 *
 *
 *  解析表单的post请求，如果后去get请求需要使用query中间件
 *  
 */
import connect from 'connect';
import bodyParser from 'body-parser';

connect()
  .use(bodyParser.json())
  .use((req, res) => {
    res.end(`Registered new user: ${req.body.username}\n`);
  })
  .listen(3000);
