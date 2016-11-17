import connect from 'connect';

const app = connect();
app
  .use(logger)
  .use('/admin', restrict)
  .use('/admin', admin)
  .use(hello);
app.listen(3000);

function logger (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

function hello (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world\n');
}

function restrict (req, res, next) {
  let authorization = req.headers.authorization;
  if (!authorization) return next(new Error('Unauthorized'));

  let parts = authorization.split(' ');
  const scheme = parts[0];
  const auth = new Buffer(parts[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  // 未实现，不影响学习
  authenticateWithDatabase(user, pass, err => {
    if (err) return next(err);

    next();
  });
}

function admin (req, res, next) {
  switch (req.url) {
    case '/':
      res.end('try /users');
      break;
    case '/users':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(['tobi', 'loki', 'jane']));
      break;
  }
}
