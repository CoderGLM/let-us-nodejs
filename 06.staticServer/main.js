import http from 'http';
import { parse } from 'url';
import { join } from 'path';
import fs from 'fs';

const root = __dirname;

const server = http.createServer((req, res) => {
  const url = parse(req.url);
  let path = join(root, url.pathname);

  fs.stat(path, (err, stat) => {
    if (err) {
      if ('ENOENT' === err.code) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    } else {
      res.setHeader('Content-Length', stat.size);
      let stream = fs.createReadStream(path);
       /* stream.on('data', chunk => {
          res.write(chunk);
        });
        stream.on('end', () => {
          res.end();
        });*/
      stream.pipe(res);
      stream.on('error', err => {
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }
  });
});

server.listen(3000);
