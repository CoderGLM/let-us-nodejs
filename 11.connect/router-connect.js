import connect from 'connect';
import route from './middleware/router';

const routes = {
  GET: {
    '/users': (req, res) => {
      res.end('tobi, loki, ferret');
    },
    '/users/:id': (req, res, id) => {
      res.end('user ' + id);
    }
  },
  DELETE: {
    '/user/:id': (req, res, id) => {
      res.end('deleted user ' + id);
    }
  }
}

connect()
  .use(router(routes))
  .listen(3000);
