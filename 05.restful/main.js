/*
 *
 *  执行此文件：babel-node main.js，要确保已经装了babel-cli 
 *
 */
import http from 'http';
import url from 'url';

let items = [];

let server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      let item = '';
      req.setEncoding('utf8');
      req.on('data', chunk => {
        item += chunk;
      });
      req.on('end', () => {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      /* items.forEach((item, i) => {
        res.write(`${i}) ${item} \n`);
      });
      res.end();*/

      let body = items.map((item, i) => {
        return `${i}) ${item}`;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Tpye', 'text/plain; charset="utf-8"');
      res.end(`${body}\n`);
      break;
    case 'DELETE':
      let path = url.parse(req.url).path.name;
      let i = Number.parseInt(path.slice(1), 10);
      if (Number.isNaN(i)) {
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item not found');
      } else {
        items.splice(i, 1);
        res.end('OK\n');
      }
      break;
  }
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    console.log('parsed', chunk);
  });
  req.on('end', () => {
    console.log('done parsing');
    res.end();
  });
});

server.listen(3000);
