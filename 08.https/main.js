/*
 *
 *  生成私钥文件：$ openssl genrsa 1024 > key.pem
 *
 *
 *  生成证书：openssl req -x509 -new -key key.pem > key-cert.pem
 *
 *
 *  说实话，浏览器显示“localhost 网页无法正常运作
 *
 *                     localhost 未发送任何数据。”
 */

import https from 'https';
import fs from 'fs';

let options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(3000);

console.log('server start on port 3000');
