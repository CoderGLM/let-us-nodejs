import connect from 'connect';

const api = connect()
              .use(users)
              .use(pets)
              .use(errorHandler);

const app = connect()
              .use(hello)
              .use('/api', api)
              .use(errorPage)
              .listen(3000);


function hello (req, res, next) {
  if (req.url.match(/^\/hello/)) {
    res.end('hello world\n');
  } else {
    next();
  }
}

const db = {
  users: {
    tobi: 'I"m tobi',
    loki: 'I"m loki',
    jane: 'I"m jane'
  }
}

function users (req, res, next) {
  const match = req.url.match(/^\/user\/(.+)/);
  if (match) {
    const user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      var err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
}

function pets (req, res, next) {
  if (req.url.match(/^\/pet\/(.+)/)) {
    foo(); // 会抛出Error
  } else {
    next();
  }
}

function errorHandler (err, req, res, next) {
  console.error('===err.stack===' + err.stack);
  res.setHeader('Content-Type', 'application/json');
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

/*
 *
 *  errorPage组件是第二个错误处理组件
 *
 *  因为前一个错误处理组件从来没调用过next(err)
 *
 *  所以这个组件只有在hello组件中出现错误时才会被调用
 *
 */
function errorPage (err, req, res, next) {
  console.log('go in errorPage');
  res.end('respond: go in errorPage');
}
