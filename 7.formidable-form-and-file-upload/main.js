import http from 'http';
import formidable from 'formidable';

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      show(req, res);
      break;
    case 'POST':
      upload(req, res);
      break;
  }
});

function show(req, res) {
  var html = `
    <form method="post" action="/" enctype="multipart/form-data">
      <p><input type="text" name="name"></p>
      <p><input type="file" name="file"></p>
      <p><input type="submit" value="Upload"></p>
    </form>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

function upload (req, res) {
  if (!isFormData(req)) {
    res.statusCode = 400;
    res.end('Bad Request: expecting multipart/form-data');
    return;
  }
  let form = new formidable.IncomingForm();
  /* form.on('field', (field, value) => {
    console.log(`${field}-${value}`);
  });
  form.on('file', (name, file) => {
    console.log(`${name}-${file}`);
  });
  form.on('end', () => {
    res.end('upload complete');
  });
  form.parse(req);*/

  form.on('progress', (received, expected) => {
    var percent = Math.floor(received/expected*100);
    console.log(percent);
  });

  form.parse(req, (err, fields, files) => {
    console.log(fields);
    console.log(files);
    res.end('upload complete');
  });

}

function isFormData(req) {
  const type = req.headers['content-type'] || '';
  return 0 === type.indexOf('multipart/form-data');
}

server.listen(3000);
