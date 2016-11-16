import http from 'http';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

import chatServer from './lib/chat_server';

var cache = {};

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    { "Content-type": mime.lookup(path.basename(filePath)) }
  );
  response.end(fileContents);
}

function srvStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, (exists) => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}


var server = http.createServer((req, res) => {
  var filePath = false;

  if (req.url === '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + req.url;
  }

  var absPath = './' + filePath;
  srvStatic(res, cache, absPath);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000.");
});

chatServer.listen(server);

