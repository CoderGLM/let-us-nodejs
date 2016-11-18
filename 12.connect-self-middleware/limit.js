/* connect.limit已经被无情的抛弃了
 *
 * http://www.senchalabs.org/connect/limit.html
 *
 *
import connect from 'connect';
import bodyParser from 'body-parser';

const app = connect();
app
  .use(connect.limit('32kb'))
  .use(bodyParser.json())
  .listen(3000);
*/

/*
 *
 * 使用raw-body：https://github.com/stream-utils/raw-body
 *
 */
import connect from 'connect';
import contentType from 'content-type';
import bodyParser from 'body-parser';
import getRawBody from 'raw-body';

const app = connect();
app
  .use((req, res, next) => {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '32kb',
      encoding: contentType.parse(req).parameters.charset
    }, (err, string) => {
      if (err) return next(err);
      req.text = string;
      next()
    })
  })
  .use(bodyParser.json())
  .listen(3000);

