import connect from 'connect';

function errorHandler () {
  const env = process.env.NODE_ENV || 'development';

  return function (err, req, res, next) {
    console.log(err);
    res.statusCode = 500;
    switch (env) {
      case 'development':
        res.setHeader('Content-Type', 'text/plain');
        res.end(err.toString());
        break;
      default:
        res.end('Server error');
    }
  }
}

connect()
  .use(function hello(req, res) {
    throw new Error('you encountered an error');
  })
  .use(errorHandler())
  .listen(3000);
