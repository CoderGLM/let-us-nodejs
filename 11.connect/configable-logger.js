import connect from 'connect';


const logger = function setup(format) {
  const regexp = /:(\w+)/g;
  return function logger_inner (req, res, next) {
    const str = format.replace(regexp, (match, property) => {
      return req[property];
    });

    console.log(str);

    next();
  }
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world\n');
}

const app = connect()
              .use(logger(':method :url'))
              .use(hello);
app.listen(3000);

