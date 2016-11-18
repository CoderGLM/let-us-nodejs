/*
 *
 *  用于测试发送大量数据的客户端－针对limit中间件
 *
 */
import http from 'http';

const req = http.request({
  method: 'POST',
  port: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

req.write('[');

let n = 30000;
while (n--) {
  req.write('"foo",');
}
req.write('"bar"]');
req.end();
